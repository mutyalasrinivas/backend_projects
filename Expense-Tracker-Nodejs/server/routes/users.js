const express = require('express');
const userController = require('../controllers/users')
 
const router = express.Router();

 router.post('/signup',userController.postUser);
 router.post('/login',userController.loginUser);
  



module.exports=router;