const routes = require('express').Router();
const auth = require('./authRoutes');
const users = require('./userlistRoutes');
const books = require('./booklistRoutes');

routes.use('/authenticate', auth);
routes.use('/users', users);
routes.use('/books', books);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Ok' });
});

module.exports = routes;