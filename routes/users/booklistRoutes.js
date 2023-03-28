const express = require("express");
const routes = express.Router({ mergeParams: true });
const booklist = require("../../controllers/booklistController");
const auth = require("../../controllers/authController");

var mongoose = require("mongoose");
var User = mongoose.model("User");

routes.use(auth.verify_token);

routes.use(function (req, res, next) {
  User.findById(req.params.userId, function (err, user) {
    if (err) res.send(err);
    req.locals = { user: user };
    next();
  });
});

routes.route("/").get(booklist.list).post(booklist.create);

routes
  .route("/:id")
  .get(booklist.read)
  .put(booklist.update)
  .delete(booklist.delete);

module.exports = routes;
