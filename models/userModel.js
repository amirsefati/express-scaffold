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
    required: true,
    index: { unique: true },
  },
  password: {
    type: String,
    select: false,
    required: true,
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

UserSchema.methods.verifyPassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

module.exports = mongoos.model("Users", UserSchema);
