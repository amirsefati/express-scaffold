const express = require("express");
const routes = express.Router();
const userlist = require("../controllers/userlistController");
const auth = require("../controllers/authController");

routes.route("/").get(auth.verify_token, userlist.list).post(userlist.create);

routes
  .route("/:id")
  .all(auth.verify_token)
  .get(userlist.read)
  .put(userlist.update)
  .delete(userlist.delete);

module.exports = routes;
