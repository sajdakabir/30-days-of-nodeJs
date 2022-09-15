const express=require('express');
const app=express();
app.use(express.json());
app.listen(3000);

const authRouter=express.Router();
app.use('/auth',authRouter);

authRouter
.route('/singup')
.get(getSingUp)
.post(postSingUp);

function getSingUp(req,res){
    res.sendFile('/public/index.html',{root:__dirname})
}
function postSingUp(req,res){
    let obj=req.body;
    console.log(obj);
    res.json({
        message:"User singed up",
        data:obj
    });
}