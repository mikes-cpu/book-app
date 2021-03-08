// setup
const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const connectDB = require("./config/db");
connectDB();

const cors = require("cors");
app.use(cors());

// http requests
app.get("/", (req, res) => {
  res.send("Backend works");
});

// server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
