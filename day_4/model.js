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
app.get('/user',(req,res)=>{
    console.log(req.query);
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

// delete request
app.delete('/user',(req,res)=>{
    users={};
    res.json({
        message:"user deleted successfully"
    })
    })


    // params
    // app.get('/user/:id',(req,res)=>{
        
    //     console.log(req.params.id)
    //     res.send("user is recived");
    // })
    app.get('/user/:username',(req,res)=>{
        
        console.log(req.params.username)
        console.log(req.params)
        res.send("user is recived");
    })