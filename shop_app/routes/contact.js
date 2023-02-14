const express = require('express');
const path = require('path');

const router = express.Router();


router.get('/contact',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','contact.html'));
})
router.post('/contact',(req,res)=>{
     res.redirect('/success')
})

router.get('/success',(req,res)=>{
    res.send('<h1>succesfully submited</h1>')
})









module.exports=router;