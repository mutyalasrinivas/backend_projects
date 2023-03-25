const express = require('express');
 

const {purchasepremium,updateTransactionStatus} = require('../controllers/purchase');


const {authenticate}=require('../middleware/auth');
const router = express.Router();

router.get('/premiummembership',authenticate,purchasepremium);

router.post('/updatetransactionstatus', authenticate,updateTransactionStatus);








module.exports = router;