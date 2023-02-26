const express = require('express');
const Expense=require('../models/expense');
const exControllers= require('../controllers/expense');
const router = express.Router();

router.post('/add',exControllers.postList);
router.get('/list',exControllers.getList);

router.post('/delete/:id',exControllers.deleteList);


module.exports=router;