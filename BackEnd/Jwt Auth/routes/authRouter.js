const { Router } = require('express');
const { signup, login, logout } = require('../controllers/authController');

const authRouter = new Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/logout', logout);

module.exports = authRouter