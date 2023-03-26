var express = require("express");
var mongoos = require("mongoose");
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");

var app = express();
var port = process.env.PORT || 3000;

//load models
var Book = require("./models/bookModel");
var User = require("./models/userModel");

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
