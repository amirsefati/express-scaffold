const routes = require("express").Router();
const auth = require("./authRoutes");
const users = require("./users/userlistRoutes");

routes.use("/authenticate", auth);
routes.use("/users", users);

routes.get("/", (req, res) => {
  res.status(200).json({ message: "Ok" });
});

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found in app" });
});

module.exports = routes;
