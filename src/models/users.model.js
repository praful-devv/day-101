const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        require:true 
    },
    email:{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    profile_img:{
        type:String,
        default:"https://ik.imagekit.io/swcg5kd9g/default_img.jpg"
    },
    bio:String
})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel