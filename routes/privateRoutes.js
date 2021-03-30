const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // const token = req.header("auth-token");
  if (req.headers.cookie) {
    const cookie = req.headers.cookie;
    const token = cookie.slice(10, 100000);

    // const token = req.headers.data.jwt.cookie.slice(10, 100000);
    if (!token) return res.status(401).send("Access Denied");
    try {
      const varified = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = varified;
      next();
    } catch (error) {
      res.status(400).send("Invalid Token");
    }
  } else {
    res.send("Access denied");
  }
};

// const jwt = await axios.get("/api/user/authorise");
// console.log(jwt.data.jwt.cookie);
// let fullString = jwt.data.jwt.cookie;
// let finalString = fullString.slice(10, 100000);
// setJwt(finalString);
// console.log(finalString);

// const jwt = req.headers;
// // const jwt = req.header("auth-token");
// res.send({
//   jwt: jwt,
// });
