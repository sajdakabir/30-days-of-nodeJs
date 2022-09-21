const userModel=require('../models/userModel');
// find all user

module.exports.getUsers=async function getUsers (req,res){
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
 
 
 module.exports.updateUser= async function updateUser(req,res){
     console.log(req.body);
     let dateToBeUpdated=req.body;
     const user=await userModel.findOneAndUpdate({"email":"test@gmail.com"},dateToBeUpdated);
     res.json({
         message:"data update successfully",
         response:user
     })
 }
 
 module.exports.deleteUser=async function deleteUser(req,res){
     const dateToBeDeteted=req.body;
     const user=await userModel.findOneAndDelete(dateToBeDeteted);
     res.json({
         message:"user deleted successfully",
         response:user
     })
 }
 
 
 module.exports.setCookies=function setCookies(req,res){
 // res.setHeader('Set-Cookie','isLoggedIn=true');
 res.cookie('isLoggedIn',true,{maxAge:1000*60*60*24,secure:true,httpOnly:true});
 res.cookie('testCookie',true);
 // httpOnly -->means we can get the cookie only from backend
 res.send('cookies has been set');
 }
 module.exports.getCookies=function getCookies(req,res){
     // const cookies=req.cookies;
     const cookies=req.cookies.isLoggedIn;
     console.log(cookies);
     res.send('cookies received');
 }
