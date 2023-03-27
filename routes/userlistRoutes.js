const routes = require("express").Router();
const userlist = require("../controllers/userlistController");
const auth = require("../controllers/authController");

routes
  .route("/")
  .get(auth.verify_token, userlist.list_all_users)
  .post(userlist.create_user);

routes
  .route("/:id")
  .all(auth.verify_token)
  .get(userlist.read_user)
  .put(userlist.update_user)
  .delete(userlist.delete_user);

module.exports = routes;
