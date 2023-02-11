const express = require('express');

const app = express();

app.use((req,res,next)=>{
  console.log("srinivas")
    next()

})
app.use((req,res,next)=> {
    res.send('<h1>Welcome to Sharpener World</h1>');
    
})












app.listen(3000,()=>{console.log("server running")});