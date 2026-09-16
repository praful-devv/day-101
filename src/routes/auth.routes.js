const express = require("express");
const authContoller = require("../controller/auth.controller")
const Router = express.Router();

Router.post("/register", authContoller.registerController);

Router.post("/login", authContoller.loginController);

module.exports = Router;
