const express=require('express');
const app=express();
const userModel=require('./models/userModel');
const cookieParser = require('cookie-parser')
app.use(express.json()); //gobal middleware
app.listen(3001);

app.use(cookieParser())

// Routes

const userRouter=express.Router();
const authRouter=express.Router();
app.use('/user',userRouter);
app.use('/auth',authRouter);

userRouter
.route('/')
.get(getUsers)
.patch(updateUser)
.delete(deleteUser)

authRouter
.route('/singup')
.post(postSingUp);
authRouter
.route('/login')
.post(loginUser);

userRouter
.route('/setCookies')
.get(setCookies);
userRouter
.route('/getCookies')
.get(getCookies);


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


function setCookies(req,res){
// res.setHeader('Set-Cookie','isLoggedIn=true');
res.cookie('isLoggedIn',true,{maxAge:1000*60*60*24,secure:true,httpOnly:true});
res.cookie('testCookie',true);
// httpOnly -->means we can get the cookie only from backend
res.send('cookies has been set');
}
function getCookies(req,res){
    // const cookies=req.cookies;
    const cookies=req.cookies.isLoggedIn;
    console.log(cookies);
    res.send('cookies received');
}

function middleware1(req,res,next){
    console.log("i am middleware");
    next();
}
function middleware2(req,res,next){
    console.log("i am middleware2");
    res.sendFile('/public/index.html',{root:__dirname});
}

function getSingUp(req,res,next){
    console.log("i am getSingUp function")
    // res.sendFile('/public/index.html',{root:__dirname});
    next();

}




async function postSingUp(req,res){
    const dataObj=req.body;
    const user=await userModel.create(dataObj);
     res.json({
         message:"User singed up",
         user:user
     });
  
}

async function loginUser(req,res){
    try{
    const data=req.body;
    const user=await userModel.findOne({email:data.email});
    if(user){
        if(user.password==data.password){
            return res.json({
                message:"User has logged in",
                userDetails:data
            });

        }else{
            return res.json({
                message:"wrong credentials"
            });
        }
    }else{
        return res.json({
            message:"user not found"
        });
    }
}
    catch(err){
        return res.status(500).json({
            message:err.message
        });
    }
}
