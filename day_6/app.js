const express=require('express');
const app=express();
const userModel=require('./models/userModel');
 
app.use(express.json()); //gobal middleware
app.listen(3001);



// Routes

const userRouter=express.Router();
app.use('/user',userRouter);

userRouter
.route('/')
.get(getUsers)
.post(postUser)
.patch(updateUser)
.delete(deleteUser)


// find all user

async function getUsers (req,res){
   const allUsers= await userModel.find();

    res.json({
        message:"list of all users ",
        result:allUsers
    })
}

//get one user

// async function getUsers (req,res){
//    const user= await userModel.findOne({name:"sajda kabir"});

//     res.json({
//         message:"one user",
//         result:user
//     })
// }

async function postUser(req,res){
    // console.log(req.body);
    const dataObj=req.body;
   const user=await userModel.create(dataObj);
    res.json({
        message:"data received successfully",
        user:user
    });
}

async function updateUser(req,res){
    console.log(req.body);
    let dateToBeUpdated=req.body;
    const user=await userModel.findOneAndUpdate({"email":"test@gmail.com"},dateToBeUpdated);
    res.json({
        message:"data update successfully",
        response:user
    })
}

async function deleteUser(req,res){
    const dateToBeDeteted=req.body;
    const user=await userModel.findOneAndDelete(dateToBeDeteted);
    res.json({
        message:"user deleted successfully",
        response:user
    })
}






