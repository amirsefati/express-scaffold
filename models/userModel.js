"use strict";

var mongoos = require("mongoos");
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
    Required: "Password is required",
  },
});

module.exports = mongoos.module("Users", UserSchema);
