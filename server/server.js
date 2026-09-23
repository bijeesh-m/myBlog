
const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");
const userRoutes = require("./Routes/userRoutes")
const authRoutes = require("./Routes/authRoutes")
const blogRoutes = require("./Routes/blogRoutes")
const cookieParser = require("cookie-parser")
const dns = require("dns");
const connectDB = require("./config/db");

const app = express();

require("dotenv").config()

dns.setServers(["8.8.8.8"])

connectDB()

app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: "http://localhost:5173", credentials: true }))

app.use(authRoutes)
app.use(userRoutes)
app.use("/api", blogRoutes)


app.listen(5000, () => {
    console.log("server is running");
})