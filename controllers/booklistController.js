"use strict";

var mongoos = require("mongoose");
var Book = mongoos.model("Book");
var User = mongoos.model("User");

exports.list = function (req, res) {
  if (req.current_user.id != req.params.userId)
    return res.status(403).json({
      message: "You do not have rights to access list items of this user.",
    });
  Book.find({ owner: req.params.userId }, function (err, book) {
    if (err) {
      return res.send(err);
    }
    res.json(book);
  });
};

exports.create = function (req, res) {
  var user = req.locals.user;
  if (!req.currentUser.canRead(user))
    return res
      .status(403)
      .send({ message: "You do not have rights to access this resource." });
  var book = new Book(req.body);
  book.owner = user;
  book.save(function (err, item) {
    if (err) return res.send(err);
    user.book.push(item);
    user.save(function (err, item) {
      if (err) return res.send(err);
      res.json(item);
    });
  });
};

exports.read = function (req, res) {
  if (!req.currentUser.canRead(req.locals.user))
    return res
      .status(403)
      .send({ message: "You do not have rights to access this resource." });
  Book.findById(req.params.id, function (err, book) {
    if (err) return res.send(err);
    res.json(book);
  });
};

exports.update = function (req, res) {
  Book.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    function (err, book) {
      if (err) return res.send(err);
      res.json(book);
    }
  );
};

exports.delete = function (req, res) {
  Book.remove(
    {
      _id: req.params.id,
    },
    function (err, book) {
      if (err) return res.send(err);
      res.json({ message: "Book successfully deleted" });
    }
  );
};
