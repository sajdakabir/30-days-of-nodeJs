const express=require('express');
const userRouter=require('./routers/userRoute');
const app=express();
app.use(express.json());

app.listen(3002);

app.use('/user',userRouter);