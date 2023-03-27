const routes = require("express").Router();
const userlist = require("../controllers/userlistController");

routes.route("/").get(userlist.list_all_users).post(userlist.create_user);

routes
  .route("/:id")
  .get(userlist.read_user)
  .put(userlist.update_user)
  .delete(userlist.delete_user);

module.exports = routes;
