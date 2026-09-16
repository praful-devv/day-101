const express = require("express")
const Router = require("./routes/auth.routes")
const cookieParser = require("cookie-parser")
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",Router)

module.exports = app