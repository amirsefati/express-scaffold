const routes = require("express").Router();
const auth = require("../controllers/authController");

routes.route("/").post(auth.authenticate);

routes.use(auth.verify_token);

module.exports = routes;
