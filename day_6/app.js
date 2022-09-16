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