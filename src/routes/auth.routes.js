const express = require("express");
const userModel = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Router = express.Router();

Router.post("/register", async (req, res) => {
  const { username, email, password, bio, profile_img } = req.body;

  const isUserExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExists) {
    return res.status(409).json({
      message:
        isUserExists.email == email
          ? "user already exists"
          : "username is taken taken already",
    });
  }

  if (!password) {
    return res.status(400).json({
      message: "password required",
    });
  }

  const hash = await bcrypt.hash(password, 12);

  const user = await userModel.create({
    username,
    email,
    password: hash,
    bio,
    profile_img,
  });

  const token = await jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRETS,
    { expiresIn: "1h" },
  );

  res.cookie("jwt_token", token);

  res.status(201).json({
    message: "your account created successfully",
    user: {
      username: user.username,
      email: user.email,
      profile_img: user.profile_img,
      bio: user.bio,
    },
  });
});

Router.post("/login", async (req, res) => {

  const {username, email, password } = req.body;
  
  const isUserExists = await userModel.findOne({
    $or:[
        {email},
        {username}
    ]
  })

  if(!isUserExists){
    return res.status(404).json({
        message:"user not found"
    })
  }

  const isPasswordMatched =await bcrypt.compare(password,isUserExists.password)

  if(!isPasswordMatched){
    return res.status(401).json({
        message:"invalid password"
    })
  }

  const token = await jwt.sign({
    id:isUserExists._id
  },
   process.env.JWT_SECRETS,
   {expiresIn:"1h"}
)

res.cookie("jwt_token",token)

res.status(200).json({
    message:"login successfully",
    user:{
        name:isUserExists.name,
        email:isUserExists.email,
        bio:isUserExists.bio,
        profile_img:isUserExists.profile_img
    }
})

});

module.exports = Router;
