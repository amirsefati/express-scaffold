const routes = require("express").Router();
const booklist = require("../controllers/booklistController");
const auth = require("../controllers/authController");

routes.use(auth.verify_token);
routes.route("/").get(booklist.list_all_books).post(booklist.create);

routes
  .route("/:id")
  .get(booklist.read)
  .put(booklist.update)
  .delete(booklist.delete);

module.exports = routes;
