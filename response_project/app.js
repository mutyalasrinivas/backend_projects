const http = require('http');
const fs=require('fs');
 

 

var server=http.createServer((req,res)=>{
       const url=req.url;
      const method=req.method;

if(url==='/'){
       res.write('<html>');
       res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">send</button></form></body>')
       res.write("</html>")
       res.end();
}

if(url==="/message" && method==='POST'){
       fs.writeFileSync('message.txt',"dummy text");
       res.statusCode=302;
       res.setHeader=('Location','/');
       return res.end();
}
 
})

server.listen(4000)
