const http=require("http");
const server= http.createServer((req,res)=>{
    console.log("request has been made from browser to server");
    console.log(req.method);
    console.log(req.url);
    res.setHeader("Content-Type","text/html");
    res.write("<h1>Hello, from sajda</h1>");
    res.write("<h2>what's going on</h2>");
    res.end();
    // res.setHeader("Content-Type","text/plain");
    // res.write("Hello, from sajda");
    // res.end();
});
// port, host,callback function
server.listen(3000,'localhost',()=>{
    console.log("server is listening on port 3000");
})