const express=require('express');
const { model } = require('mongoose');
const userRouter=express.Router();
const{updateUser,deleteUser,getUser,getAllUser}=require('../controllers/userController');
// user option
userRouter.route('/:id')
.patch(updateUser)
.delete(deleteUser)

userRouter.route('signup')
.post(signup)

userRouter.route('login')
.post(login)

// profile page
app.use(protectRoute)
userRouter.route('/userProfile')
.get(getUser)

// specific to admin
app.use(isAuthorised()['admin']);
userRouter.route('')
.get(getAllUser)


module.exports=userRouter;
