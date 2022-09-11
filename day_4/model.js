const express=require('express');
const app=express();
app.use(express.json());
app.listen(3000);
let users={};
app.get('/user',(req,res)=>{
    res.send(users);
})

// post request

app.post('/user',(req,res)=>{
    console.log(req.body);
    users=req.body;
    res.json({
        message:"data received successfully",
        user:req.body
    });
});

//update request--->patch


app.patch('/user',(req,res)=>{
    console.log(req.body);
    let dateToBeUpdated=req.body;
    for(key in dateToBeUpdated){
        users[key]=dateToBeUpdated[key];
    }
    res.json({
        message:"data update successfully"
    })
});

// delete a data

app.delete('/user',(req,res)=>{
users={};
res.json({
    message:"user deleted successfully"
})
})
