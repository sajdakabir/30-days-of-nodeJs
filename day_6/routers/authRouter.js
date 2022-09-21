const express = require('express');
const authRouter = express.Router();
const{postSingUp,loginUser}=require('../controllers/authController');
const jwt = require('jsonwebtoken');
const JWT_KEY=require('../secrets');

authRouter
    .route('/singup')
    .post(postSingUp);
authRouter
    .route('/login')
    .post(loginUser);



module.exports = authRouter;