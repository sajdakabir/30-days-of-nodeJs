const express=require('express');
const { model } = require('mongoose');
const userRouter=express.Router();
const protectRoute=require('./authHelper');
const{getUsers,updateUser,deleteUser,setCookies,getCookies}=require('../controllers/userController');
userRouter
.route('/')
.get(protectRoute,getUsers)
.patch(updateUser)
.delete(deleteUser)

userRouter
.route('/setCookies')
.get(setCookies);
userRouter
.route('/getCookies')
.get(getCookies);


 module.exports=userRouter;