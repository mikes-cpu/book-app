// setup
const express = require("express");
const app = express();
const varify = require("./routes/privateRoutes");
const path = require("path");

const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });



const connectDB = require("./config/db");
connectDB();

app.use(express.json());
app.use(express.urlencoded());

// whitelist heroku url
const whitelist = ['http://localhost:3000'​, 'http://localhost:5000'​, "https://skoob-site.herokuapp.com/"]
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}

const cors = require("cors");
app.use(cors(corsOptions));

const book = require("./routes/book");
app.use("/api/book", book);

const auth = require("./routes/auth");
app.use("/api/user", auth);

// serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/client/build/index.html"));
  });
}

console.log(`thing: ${process.env.NODE_ENV}`);
// server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
