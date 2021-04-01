const { createProxyMiddleware } = require("http-proxy-middleware");

let API_SERVER = "http://localhost:5000";

// process.env.NODE_ENV === "production"
//   ? (API_SERVER = "https://skoob-site.herokuapp.com/")
//   : (API_SERVER = "http://localhost:5000");

// console.log(API_SERVER);

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: API_SERVER,
      changeOrigin: true,
    })
  );
};
