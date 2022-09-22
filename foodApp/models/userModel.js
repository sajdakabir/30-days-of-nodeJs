const emailValidator=require('email-validator');
const mongoose=require('mongoose');
const db_link='mongodb+srv://admin:P8QibnCrwszXpkuX@cluster0.usksjpz.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(db_link)
.then(function(db){
    console.log("db is connected");
})
.catch(function(err){
    console.log(err);
})

const userSchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        tupe:String,
        require:true,
        unique:true,
        validate:function(){
            return emailValidator.validate(this.email);
        }
    },
    password:{
        type:String,
        require:true,
        minLength:8
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:8,
        validate:function(){
            return this.confirmPassword==this.password;
        }
    },
    role:{
        type:String,
        enum:['admin','user','restaurantowner','deliveryboy'],
        default:'user'
    },
    profileImage:{
        type:String,
        default:'img/user/default.jpeg'
    }
});




userSchema.pre('save',function(){
    this.confirmPassword=undefined;
})

const userModel=mongoose.model('userModel',userSchema);

module.exports=userModel;
