var path = require('path');
var express = require('express');
require('dotenv').config()  
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
var options = {
  target: process.env.BAR_BACK_URL || "http://localhost:8000",
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/'
  },
}
const apiProxy = createProxyMiddleware(options)

app.use("/api", apiProxy);
app.use(express.static(path.join(__dirname, 'dist')));

app.set('port', process.env.PORT || 8080);
var server = app.listen(app.get('port'), function () {
  console.log('listening on port ', server.address().port);
});