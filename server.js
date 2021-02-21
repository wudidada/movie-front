var express = require("express");
var history = require("connect-history-api-fallback");
var app = express();

const staticFileMiddleware = express.static("dist");

// 1st call for unredirected requests
app.use(staticFileMiddleware);

app.use(history());

app.use(staticFileMiddleware);

const port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`);
});
