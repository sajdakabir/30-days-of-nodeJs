const express=require('express');
const app=express();
app.use(express.json());
app.listen(3000);
let users=[
    {
        'id':1,
        'name':"sajda"
    },
    {
        'id':2,
        'name':"saju"
    },
    {
        'id':3,
        'name':"kabir"
    },
];

const userRouter=express.Router();

app.use('/user',userRouter);

userRouter
.route('/')
.get(getUser)
.post(postUser)
.patch(updateUser)
.delete(deleteUser)

userRouter
.route('/:id')
.get(getUserById)

   
  
    function getUser (req,res){
        console.log(req.query);
        res.send(users);
    }

    function postUser(req,res){
        console.log(req.body);
        users=req.body;
        res.json({
            message:"data received successfully",
            user:req.body
        });
    }

    function updateUser(req,res){
        console.log(req.body);
        let dateToBeUpdated=req.body;
        for(key in dateToBeUpdated){
            users[key]=dateToBeUpdated[key];
        }
        res.json({
            message:"data update successfully"
        })
    }

    function deleteUser(req,res){
        users={};
        res.json({
            message:"user deleted successfully"
        })
    }

    function getUserById(req,res){
        console.log(req.params.id);
        let paramId=req.params.id;
        let obj={};
        for(let i=0;i<users.length;i++){
            if(users[i]['id']==paramId){
                obj=users[i];
            }
        }
        res.json({
            message:"request received",
            data:obj
        })
    }