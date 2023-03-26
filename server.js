var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var mongoos = require("mongoose");
var Book = require("./api/models/bookModel");
var bodyParser = require("body-parser");

mongoos.Promise = global.Promise;
mongoos.connect("mongodb://localhost/booklist");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require("./api/reoutes/booklistRoutes");
routes(app);

app.listen(port);
