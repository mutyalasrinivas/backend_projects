const express =require('express');
 
const{addExpense} = require('../controllers/expense');
const{getList} = require('../controllers/expense');
const{deleteEle}= require('../controllers/expense');
const{authenticate}=require('../middleware/auth');
const {downloadexpense}=require('../controllers/expense');
const downloadController = require('../controllers/downloadController');
const router =express.Router();
router.post('/addexpense',authenticate,addExpense);
router.get('/allexpenses',authenticate,getList);
router.delete('/expenses/:id',authenticate,deleteEle);
router.get('/download',authenticate,downloadexpense);

router.get('/downloadlist',authenticate,downloadController.listDownloads);




module.exports=router;