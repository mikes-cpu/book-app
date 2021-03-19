// setup
const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const connectDB = require("./config/db");
connectDB();

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded());

// http requests
app.get("/", (req, res) => {
  res.send("/ endpoint works");
});

const book = require("./routes/book");
app.use("/book", book);

const auth = require("./routes/auth");
app.use("/api/user", auth);
// server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
