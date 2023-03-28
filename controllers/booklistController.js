"use strict";

var mongoos = require("mongoose");
var Book = mongoos.model("Book");
var User = mongoos.model("User");

exports.list = function (req, res) {
  Book.find({ owner: req.params.userId }, function (err, book) {
    if (err) {
      res.send(err);
    }
    res.json(book);
  });
};

exports.create = function (req, res) {
  var user = req.locals.user;
  var book = new Book(req.body);
  book.owner = user;
  book.save(function (err, item) {
    if (err) res.send(err);
    user.book.push(item);
    user.save(function (err, item) {
      if (err) res.send(err);
      res.json(item);
    });
  });
};

exports.read = function (req, res) {
  Book.findById(req.params.id, function (err, book) {
    if (err) res.send(err);
    res.json(book);
  });
};

exports.update = function (req, res) {
  Book.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    function (err, book) {
      if (err) res.send(err);
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
      if (err) res.send(err);
      res.json({ message: "Book successfully deleted" });
    }
  );
};
