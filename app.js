const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary");

const app = express();

// Setting up config.env file variables
dotenv.config({ path: "./config/config.env" });

// Setup body parser
app.use(express.json());

// Set cookie parser
app.use(cookieParser());

app.use(fileUpload());

//configure cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Importing all routes
const auth = require("./routes/auth.js");
const jobs = require("./routes/jobs.js");

app.use("/api/v1", auth);
app.use("/api/v1", jobs);

app.get("/", (req, res) => {
  res.status(200).send("Hello devs");
});

// Handle unhandled routes
app.all("*", (req, res) => {
  return res.status(404).json({
    error: `Route not found`,
  });
});

module.exports = app;
