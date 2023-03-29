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
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
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

UserSchema.methods.canRead = function (object) {
  return object.id == this.id || (object.owner && object.owner == this.id);
};

UserSchema.methods.canEdit = function (object) {
  return this.canRead(object); // can be extended later
};

UserSchema.methods.getTokenData = function () {
  return {
    id: this.id,
    email: this.email,
  };
};

UserSchema.methods.verifyPassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

module.exports = mongoos.model("User", UserSchema);
