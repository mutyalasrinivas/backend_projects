const express =require('express');
const router =express.Router();
const{addExpense} = require('../controllers/expense');
const{getList} = require('../controllers/expense');
const{deleteEle}= require('../controllers/expense');
const{authenticate}=require('../middleware/auth');
router.post('/expense/addexpense',authenticate,addExpense);
router.get('/expense/allexpenses',authenticate,getList);
router.delete('/expense/expenses/:id',deleteEle);




module.exports=router;