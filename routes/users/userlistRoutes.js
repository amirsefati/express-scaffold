const express = require("express");
const routes = express.Router();
const userlist = require("../../controllers/userlistController");
const auth = require("../../controllers/authController");
const books = require("./booklistRoutes");

routes
  .route("/:id")
  .all(auth.verify_token)
  .get(userlist.read)
  .put(userlist.update)
  .delete(userlist.delete);

routes.route("/").get(auth.verify_token, userlist.list).post(userlist.create);

module.exports = routes;
