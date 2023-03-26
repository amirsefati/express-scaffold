"use strict";

var mongoos = require("mongoose");
var Schema = mongoos.Schema;

var BookSchema = new Schema({
  title: {
    type: String,
    Required: "Title of book is required",
  },
});

module.exports = mongoos.model("Book", BookSchema);
