const express = require('express');
const authRouter = express.Router();
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const JWT_KEY=require('../secrets');

authRouter
    .route('/singup')
    .post(postSingUp);
authRouter
    .route('/login')
    .post(loginUser);


function middleware1(req, res, next) {
    console.log("i am middleware");
    next();
}
function middleware2(req, res, next) {
    console.log("i am middleware2");
    res.sendFile('/public/index.html', { root: __dirname });
}

function getSingUp(req, res, next) {
    console.log("i am getSingUp function")
    // res.sendFile('/public/index.html',{root:__dirname});
    next();

}




async function postSingUp(req, res) {
    const dataObj = req.body;
    const user = await userModel.create(dataObj);
    res.json({
        message: "User singed up",
        user: user
    });

}

async function loginUser(req, res) {
    try {
        const data = req.body;
        if (data.email) {
            const user = await userModel.findOne({ email: data.email });
            if (user) {
                if (user.password == data.password) {
                    const uid=user['_id'];
                    const token=jwt.sign({payload:uid},JWT_KEY);
                    res.cookie('login',token,{httpOnly:true});
                    return res.json({
                        message: "User has logged in",
                        userDetails: data
                    });

                } else {
                    return res.json({
                        message: "wrong credentials"
                    });
                }
            } else {
                return res.json({
                    message: "user not found"
                });
            }
        }else{
            return res.json({
                message:"enter email"
            })
        }
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

module.exports = authRouter;