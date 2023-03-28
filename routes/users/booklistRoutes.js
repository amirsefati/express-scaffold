const express = require("express");
const routes = express.Router({ mergeParams: true });
const booklist = require("../../controllers/booklistController");
const auth = require("../../controllers/authController");

routes.use(auth.verify_token);
routes.route("/").get(booklist.list).post(booklist.create);

routes
  .route("/:id")
  .get(booklist.read)
  .put(booklist.update)
  .delete(booklist.delete);

module.exports = routes;
