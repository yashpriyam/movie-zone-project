const Router = require('express').Router();
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');

Router.use('/auth', authRoutes);
Router.use('/movie', userRoutes);

module.exports = Router;