"use strict";

module.exports = function (app) {
  var booklist = require("../controllers/booklistController");

  app.route("/books").get(booklist.list_all_books).post(booklist.create_book);

  app
    .route("/book/:id")
    .get(booklist.read_book)
    .put(booklist.update_book)
    .delete(booklist.delete_book);
};
