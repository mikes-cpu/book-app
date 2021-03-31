// setup
const express = require("express");
const app = express();
const varify = require("./routes/privateRoutes");
const path = require("path");

const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const connectDB = require("./config/db");
connectDB();

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded());

const book = require("./routes/book");
app.use("/api/book", book);

const auth = require("./routes/auth");
app.use("/api/user", auth);

// serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname + "client", "build", "index.html"));
  });
}

console.log(`Other thing: ${__dirname}`);
console.log(`thing: ${process.env.NODE_ENV}`);
// server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
