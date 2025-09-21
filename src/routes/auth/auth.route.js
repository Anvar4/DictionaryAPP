const express = require('express');
const AuthController = require('../../controllers/auth/auth.controller.js');
const authMiddleware = require('../../middleware/auth.middleware.js');

const authRouter = express.Router();

authRouter.post('/register', AuthController.register);
authRouter.post('/login', AuthController.login);
authRouter.get('/me', authMiddleware, AuthController.me);

module.exports = authRouter;
