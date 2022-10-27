const Router = require('express').Router();
const controller = require('../controller/auth.controller');

Router.post('/login', controller.loginUser);
Router.post('/register', controller.registerUser);

module.exports = Router;