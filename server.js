var express = require("express");
var mongoos = require("mongoose");
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
var morgan = require("morgan");

const config = require("./config/config");
const db = require("./config/db");

var app = express();
var port = process.env.PORT || config.server.port;

//load models
var Book = require("./models/bookModel");
var User = require("./models/userModel");

app.set("secret", "password-secret");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// register routes
var routes = require("./routes/index");
app.use("/", routes);

app.use(morgan("dev"));

app.listen(port);
