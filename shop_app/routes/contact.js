const express = require('express');
const path = require('path');

const contactController=require('../controllers/contact.js')

const router = express.Router();


router.get('/contact', contactController.details)
router.post('/contact',(req,res)=>{
     res.redirect('/success')
})

router.get('/success',contactController.success )









module.exports=router;