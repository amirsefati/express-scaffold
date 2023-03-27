const routes = require("express").Router();
const booklist = require("../controllers/booklistController");
const auth = require("../controllers/authController");

routes.use(auth.verify_token);
routes.route("/").get(booklist.list_all_books).post(booklist.create_book);

routes
  .route("/:id")
  .get(booklist.read_book)
  .put(booklist.update_book)
  .delete(booklist.delete_book);

module.exports = routes;
