const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_KEY = require('../secrets');
const userModel = require('../models/userModel');



// singup user 
module.exports.signup = async function signup(req, res) {
    try {
        let dataObj = req.body;
        let user = await userModel.create(dataObj);
        if (user) {
            return res.json({
                message: "user signed up",
                data: user
            });
        } else {
            res.json({
                message: "error while signing up"
            });
        }

    } catch (err) {
        res.json({
            message: err.message
        });
    }

}
// login function
module.exports.login = async function login(req, res) {
    try {
        const data = req.body;
        if (data.email) {
            const user = await userModel.findOne({ email: data.email });
            if (user) {
                if (user.password == data.password) {
                    const uid = user['_id'];
                    const token = jwt.sign({ payload: uid }, JWT_KEY);
                    res.cookie('login', token, { httpOnly: true });
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
        } else {
            return res.json({
                message: "enter email"
            })
        }
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}



// isAuthorised-->to check the user's role

module.exports.isAuthorised = function isAuthorised(roles) {
    return function (req, res, next) {
        if (roles.include(req.role) == true) {
            next();
        } else {
            res.status(401).json({
                message: "operation not allowed"
            });
        }
    }
}


// protectRoute

 module.exports.protectRoute=async function protectRoute(req, res, next) {
    // console.log(req.cookies);
    try {
        let token;
        if (req.cookies.login) {
            token = req.cookies.login;
            const payload = jwt.verify(token, JWT_KEY)
            // console.log(req.cookies);
            if (payload) {
                const user = await userModel.findById(payload.payload);
                req.role = user.role;
                req.id = user = id;
                next();
            } else {
                res.json({
                    message: 'user not verified'
                });
            }

        } else {
            return res.json({
                message: "please login again"
            })
        }
    }catch(err){
        res.json({
            message:err.message
        })
    }
}
