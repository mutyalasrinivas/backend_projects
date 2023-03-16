const express = require('express');
const {postUser} = require('../controllers/users')
const {loginUser} = require('../controllers/users');
 
const router = express.Router();

 router.post('/user/signup',postUser);
 router.post('/user/login',loginUser);





module.exports=router;