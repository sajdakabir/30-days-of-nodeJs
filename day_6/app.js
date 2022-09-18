const express=require('express');
const app=express();
app.use(express.json()); //gobal middleware
app.listen(3001);

const mongoose=require('mongoose');

const db_link='mongodb+srv://admin:P8QibnCrwszXpkuX@cluster0.usksjpz.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
    // console.log(db);
    console.log('db is connected');
})
.catch(function(err){
    console.log(err);
});


const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:8
    }
});

// model

const userModel=mongoose.model('userModel',userSchema);

// **************************************** \\

// create a user with createUser()function


//  (async function createUser(){
//     let user={
//         name:'test',
//         email:'test@gmail.com',
//         password:'1234mc678',
//         confirmPassword:'1234mc678'
//     };
//     let data= await userModel.create(user);
//     console.log(data);
// })();

// **************************************** \\

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
    console.log(req.body);
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

function deleteUser(req,res){
    users={};
    res.json({
        message:"user deleted successfully"
    })
}