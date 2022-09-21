const express=require('express');
const { model } = require('mongoose');
const jwt = require('jsonwebtoken');
const JWT_KEY='cbaiuwhfuwiefnwjecncdsfkjndsmfds';
function protectRoute(req,res,next){
    // console.log(req.cookies);
    if(req.cookies.login){
        const isVerified=jwt.verify(req.cookies.login,JWT_KEY)
        console.log(req.cookies);
        if(isVerified){
        next();
        }else{
            res.json({
                message:'user not verified'
            })
        }
    }else{
        return res.json({
            message:"operation not allowed"
        })
    }
    }


    module.exports=protectRoute;



    // jwt note---->>>
    // header+payload+signature
    // signature =header(get from front end)+payload(front end)+secret key(backend have only)

