const http = require('http');


var server=http.createServer((req,res)=>{

       res.setHeader('Content-Type','text-html');
       res.write('<html>');
       res.write(`<body><h2>Welcome To My ${req.url}  Page </h2></body>`);
       res.write('</html>');
       res.end();
})

server.listen(4000)
