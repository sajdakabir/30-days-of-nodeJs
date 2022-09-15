const express=require('express');
const app=express();
app.use(express.json()); //gobal middleware
app.listen(3000);

const authRouter=express.Router();
app.use('/auth',authRouter); //gobal middleware

authRouter
.route('/singup')
// .get(getSingUp) //path specific middleware
// .get(middleware,getSingUp) 
.get(middleware1,getSingUp,middleware2) 
.post(postSingUp);

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
function postSingUp(req,res){
    let obj=req.body;
    console.log(obj);
    res.json({
        message:"User singed up",
        data:obj
    });
}