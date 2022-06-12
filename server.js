require("dotenv").config();
const path = require("path"),
  express = require("express"),
  { createProxyMiddleware } = require("http-proxy-middleware");

console.log("Using Bar Back at", process.env.BAR_BACK_URL);
var options = {
  target: process.env.BAR_BACK_URL,
  changeOrigin: true,
  xfwd: true,
  pathRewrite: {
    "^/api": "/",
  },
};
const apiProxy = createProxyMiddleware(options);

const app = express();
app.use("/api", apiProxy);
app.use(express.static(path.join(__dirname, "dist")));

app.set("port", process.env.PORT || 8080);
var server = app.listen(app.get("port"), function () {
  console.log("listening on port ", server.address().port);
});
