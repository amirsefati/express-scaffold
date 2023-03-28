"use strict";

var mongoos = require("mongoose");
var bcrypt = require("bcrypt");
var Schema = mongoos.Schema;

var UserSchema = new Schema({
  name: {
    type: String,
    required: "Name is required!",
  },
  email: {
    type: String,
    Required: "Email is required",
  },
  password: {
    type: String,
    select: false,
    Required: "Password is required",
  },
});

UserSchema.pre("save", function (next) {
  var user = this;

  if (!user.isModified("password")) return next();

  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) return next(err);

    user.password = hash;
    next();
  });
});

module.exports = mongoos.model("Users", UserSchema);
