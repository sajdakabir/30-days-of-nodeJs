const http=require("http");
const fs=require("fs");
const server= http.createServer((req,res)=>{
    console.log("request has been made from browser to server");
    // console.log(req.method);
    // console.log(req.url);
   
    // res.setHeader("Content-Type","text/plain");
    // res.write("Hello, from sajda");
    // res.end();
    res.setHeader("Content-Type","text/html");
    // res.write("<h1>Hello, from sajda</h1>");
    // res.write("<h2>what's going on</h2>");
    // res.end();



    // fs.readFile("./views/index.html",(err,fileData)=>{
    //     if(err){
    //         console.log(err);
    //     }else{
    //         // res.write(fileData);
    //         res.end(fileData);
    //     }
    // })

let path="./views";
switch(req.url){
    case "/":
        path+="/index.html";
        break;
    case "/about":
        path+="/about.html";
        break;
    default:
        path+="/404.html";
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
