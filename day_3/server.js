const http=require("http");
const fs=require("fs");
const _ = require('lodash');
const server= http.createServer((req,res)=>{
    console.log("request has been made from browser to server");
  
    res.setHeader("Content-Type","text/html");

    // use the lodash 
  var rand=  _.random(0, 5);
console.log(rand);
   
let path="./views";
switch(req.url){
    case "/":
        path+="/index.html";
        res.statusCode=200;
        break;
    case "/about":
        path+="/about.html";
        res.statusCode=200;
        break;
      
    case "/about-me":
        res.statusCode=301;
        res.setHeader("Location","/about");
        res.end();
        break;    
    default:
        path+="/404.html";
        res.statusCode=404;
        break;
}
    fs.readFile(path,(err,fileData)=>{
        if(err){
            console.log(err);
        }else{
            // res.write(fileData);
            res.end(fileData);
        }
    })
    

});
// port, host,callback function
server.listen(3000,'localhost',()=>{
    console.log("server is listening on port 3000");
})