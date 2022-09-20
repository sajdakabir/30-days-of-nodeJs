
const emailValidator = require("email-validator");
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
        unique:true,
        validate:function(){
            return emailValidator.validate(this.email);
        }
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:8,
        validate:function(){
            return this.confirmPassword==this.password;
        }
    }
});


// all about Mongoose hooks

// it has two type of hooks 1.pre , 2.post

// syntex of moongoose hooks


// userSchema.pre('save',function(){
//     console.log("before saving in db",this);
// })

// userSchema.post('save',function(doc){
//     console.log("after saving in db",doc);
// })


// write mongoose hooks to hind confirmPassword
userSchema.pre('save',function(){
    this.confirmPassword=undefined;
})




// model

const userModel=mongoose.model('userModel',userSchema);
module.exports=userModel;

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
