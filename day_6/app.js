const express=require('express');
const app=express();
// const userModel=require('./models/userModel');
const cookieParser = require('cookie-parser');
const userRouter=require('./routers/userRouter');
const authRouter=require('./routers/authRouter');

app.use(express.json()); //gobal middleware
app.listen(3001);

app.use(cookieParser())

// Routes



app.use('/user',userRouter);
app.use('/auth',authRouter);

