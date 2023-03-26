const routes = require('express').Router();
const users = require('./userlistRoutes');
const books = require('./booklistRoutes');

routes.use('/users', users);
routes.use('/books', books);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Ok' });
});

module.exports = routes;