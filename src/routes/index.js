const baseRoutes = require('./baseRoutes');
const notesRoutes = require('./notesRoutes');
const userRoutes = require('./usersRoutes');
const { isAuthenticated } = require('../helpers/auth');

const route = (app) => {
  app.use(baseRoutes);
  app.use('/notes', isAuthenticated, notesRoutes);
  app.use('/users', userRoutes);
};

module.exports = route;
