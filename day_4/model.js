const express=require('express');
const app=express();
app.use(express.json());
app.listen(3000);
let users={};
app.get('/users',(req,res)=>{
    res.send(users);
})

app.post('/users',(req,res)=>{
    console.log(req.body);
    users=req.body;
    res.json({
        message:"data received successfully",
        user:req.body
    });
});
