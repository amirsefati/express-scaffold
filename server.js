var express = require("express");
var mongoos = require("mongoose");
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var morgan = require("morgan");

var app = express();
var port = process.env.PORT || 3000;

//load models
var Book = require("./models/bookModel");
var User = require("./models/userModel");

mongoos.Promise = global.Promise;
mongoos.connect("mongodb://localhost/booklist");

app.set('secret', 'password-secret');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// register routes
var routes = require("./routes/index");
app.use("/", routes);

app.use(morgan("dev"));
app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found in app" });
});

app.listen(port);
