"use strict";

var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var User = mongoose.model("User");

var configuration = require("../config/config");

var privateKey = configuration.key.privateKey;
var tokenExpireInMinutes = configuration.key.tokenExpireInMinutes;

exports.authenticate = function (req, res) {
  User.findOne({ email: req.body.email })
    .select("+password")
    .exec(function (err, user) {
      if (err) throw err;
      // respond with error if user was not found
      if (!user) {
        res.status(401).json({
          success: false,
          message: "Authentication failed. User not found.",
        });
      } else if (user) {
        // check if password matches
        user.verifyPassword(
          req.body.password,
          user.password,
          function (err, isMatch) {
            if (isMatch) {
              var token = jwt.sign(user, privateKey, {
                expiresIn: tokenExpireInMinutes,
              });
              res.json({
                success: true,
                message: "Token created.",
                token: token,
              });

              var token = jwt.sign(user.getTokenData(), privateKey, {
                expiresIn: tokenExpireInMinutes,
              });
              res.json({
                success: true,
                message: "Token created.",
                token: token,
              });
            } else {
              res.status(401).json({
                success: false,
                message: "Authentication failed. Wrong password.",
              });
            }
          }
        );
      }
    });
};

exports.verify_token = function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, privateKey, function (err, decoded) {
      // TODO: to settings
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Failed to authenticate token.",
        });
      } else {
        // if everything is good, save to request for use in other routes
        User.findById(decoded.id, function (err, user) {
          if (err) res.send(err);
          req.currentUser = user;
          next();
        });
      }
    });
  } else {
    // if there is no token, return an error
    return res.status(401).send({
      success: false,
      message: "No token provided.",
    });
  }
};
