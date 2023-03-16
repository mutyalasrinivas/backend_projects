const express = require('express');
const {postUser} = require('../controllers/signup')
 
const router = express.Router();

 router.post('/user/signup',postUser);
 




module.exports=router;