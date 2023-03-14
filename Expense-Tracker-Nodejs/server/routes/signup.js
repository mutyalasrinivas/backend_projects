const express = require('express');
const {postUser,getSignup} = require('../controllers/signup')
const router = express.Router();

 router.post('/user/signup',postUser);





module.exports=router;