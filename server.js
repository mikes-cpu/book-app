// setup
const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const connectDB = require("./config/db");
connectDB();

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());

// http requests
const googleApiRoute = require("./routes/google-api");
app.use("/addBook", googleApiRoute);
// server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
