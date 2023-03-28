"use strict";

var mongoose = require("mongoose");
var User = mongoose.model("User");

exports.list = function (req, res) {
  User.find({}, function (err, user) {
    if (err) res.send(err);
    res.json(user);
  });
};

exports.create = function (req, res) {
  var new_user = new User(req.body);
  new_user.save(function (err, user) {
    if (err) res.send(err);
    res.json(user);
  });
};

exports.read = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) res.send(err);
    res.json(user);
  });
};

exports.update = function (req, res) {
  var user = req.body;
  User.findOneAndUpdate(
    { _id: req.params.id },
    user,
    { new: true },
    function (err, user) {
      if (err) res.send(err);
      res.json(user);
    }
  );
};

exports.delete = function (req, res) {
  User.remove(
    {
      _id: req.params.id,
    },
    function (err, user) {
      if (err) res.send(err);
      res.json({ message: "user successfully deleted" });
    }
  );
};

exports.load_user = function (req, res, next) {
  User.findById(req.params.userId, function (err, user) {
    if (err) res.send(err);
    if (!req.locals) req.locals = {};
    req.locals.user = user;
    next();
  });
};
