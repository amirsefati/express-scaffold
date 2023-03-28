"use strict";

var mongoos = require("mongoose");
var Schema = mongoos.Schema;

var BookSchema = new Schema({
  title: {
    type: String,
    required: "Title of book is required",
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoos.model("Book", BookSchema);
