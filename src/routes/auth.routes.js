const express = require("express")
const userModel = require("../models/users.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const Router = express.Router()

Router.post("/register",async(req,res)=>{
    const { username, email, password, bio, profile_img} = req.body;

    const isUserExists = await userModel.findOne({email})

    if(isUserExists){
        return res.status(409).json({
            message:"user already exists"
        })
    }

    const hash = await bcrypt.hash(password,12)

    const user = await userModel.create({
        name,email,password:hash
    })

    const token = await jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRETS,
      {expiresIn:"1h"}
    )

    res.cookie("jwt_token",token)

    res.status(201).json({
        message:"your account created successfully",
        user
    })
})

module.exports = Router