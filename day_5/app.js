const express=require('express');
const app=express();
app.listen(3000);

const authRouter=express.Router();
app.use('/auth',authRouter);