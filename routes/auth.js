const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../validation");
const cookieParser = require("cookie-parser");
const varify = require("./privateRoutes");

const maxAge = 3 * 24 * 60 * 60; // 3 days

//Middleware
router.use(cookieParser());

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error)
    return res.status(400).send(error.details.map((error) => error.message));

  // check if the user is already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email inputted already exists");

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });
  try {
    const savedUser = await user.save();
    console.log(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }

  // create and assign a token
  const token = createToken(user._id);

  res.cookie("jwt token", token, { httpOnly: true }); // 3 days
  res.status(201).json({
    user: user._id,
    token: token,
  });
});

router.post("/login", async (req, res) => {
  // const { error } = loginValidation(req.body);
  // if (error)
  //   return res.status(400).send(error.details.map((error) => error.message));

  try {
    await res.send(req.body);
    // // check if the email exists
    // const user = await User.findOne({ email: req.body.email });
    // if (!user) return res.status(400).send("Email inputted doesnt exist");
    // // check if the password is correct
    // const validPass = await bcrypt.compare(req.body.password, user.password);
    // if (!validPass) return res.status(400).send("invaid password");

    // // create and assign a token
    // const token = createToken(user._id);

    // res.cookie("jwt token", token, { httpOnly: true }); // 3 days
    // res.status(201).json({
    //   user: user._id,
    //   token: token,
    // });
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/authorise", varify, async (req, res) => {
  try {
    const jwt = req.headers;
    // const jwt = req.header("auth-token");
    res.json({
      jwt: jwt,
      user: req.user,
    });
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/logout", varify, (req, res) => {
  try {
    res.clearCookie("jwt token").send("Cookies cleared");
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/currentUser", async (req, res) => {});

module.exports = router;
