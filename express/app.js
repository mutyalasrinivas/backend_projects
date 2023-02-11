const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.urlencoded({extended:true}))

app.use('/add-products',(req,res,next)=>{
    res.send('<form action="/products" method="POST"><input type="text" name="title" ><input type="number" name="size"><button type="submit">submit</button></form>')
})

app.post('/products',(req,res,next)=> {
    console.log(req.body);
    console.log("products page")
    res.redirect('/');
    
})

app.use('/',(req,res,next)=>{
    res.send('<h1>from express!</h1>')
  
  })












app.listen(3000,()=>{console.log("server running")});