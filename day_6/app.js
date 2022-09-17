const express=require('express');
const app=express();
app.use(express.json()); //gobal middleware
app.listen(3001);

const mongoose=require('mongoose');

const db_link='mongodb+srv://admin:P8QibnCrwszXpkuX@cluster0.usksjpz.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
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

 (async function createUser(){
    let user={
        name:'sajda kabir',
        email:'abd@gmail.com',
        password:'12345678',
        confirmPassword:'12345678'
    };
    let data= await userModel.create(user);
    console.log(data);
})