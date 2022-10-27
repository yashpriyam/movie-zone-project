const Router = require('express').Router();
const userRoutes = require('../controller/user.controller');
const { verifyToken } = require('../middlewares')

Router.get('/all', verifyToken, userRoutes.getAllMoviesByUserId);
Router.post('/add', verifyToken, userRoutes.addMovie);
Router.put('/update', verifyToken, userRoutes.updateMovie);
Router.delete('/delete', verifyToken, userRoutes.deleteMovie);

module.exports = Router;