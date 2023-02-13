const express=require('express');
 
const router = express.Router();;


router.get('/add-products',(req,res,next)=>{
    res.send('<form action="/admin/products" method="POST"><input type="text" name="title" ><input type="number" name="size"><button type="submit">submit</button></form>')
})

router.post('/products',(req,res,next)=> {
    console.log(req.body);
    console.log("products page")
    res.redirect('/');
    
})






module.exports=router;