var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var mongoos = require("mongoose");
var Book = require("./models/bookModel");
var bodyParser = require("body-parser");

mongoos.Promise = global.Promise;
mongoos.connect("mongodb://localhost/booklist");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found in app" });
});

var routes = require("./routes/booklistRoutes");
routes(app);

app.listen(port);
