const express = require('express');
const path = require('path');
const router = express.Router();

const userController = require('../controllers/users') ;

 
// router.get('/',userController.getform);
router.post('/add-user',userController.addUser);
router.get('/get-user',userController.getUser);
 
router.post('/delete-user/:id',userController.deleteUser);







module.exports=router;