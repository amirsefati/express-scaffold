"use strict";

var mongoos = require("mongoose");
var Book = mongoos.model("Book");

exports.list_all_books = function (req, res) {
  Book.find({}, function (err, book) {
    if (err) {
      res.send(err);
    }
    res.json(book);
  });
};

exports.create_book = function (req, res) {
  var new_book = new Book(req.body);
  new_book.save(function (err, book) {
    if (err) res.send(err);
    res.json(book);
  });
};

exports.read_book = function (req, res) {
  Book.findById(req.params.id, function (err, book) {
    if (err) res.send(err);
    res.json(book);
  });
};

exports.update_book = function (req, res) {
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

exports.delete_book = function (req, res) {
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
