const express = require('express')

const premiumFeatureController = require('../controllers/premium');
const{authenticate}=require('../middleware/auth');
 const router = express.Router();



router.get('/showLeaderBoard',authenticate,premiumFeatureController.getUserLeaderBoard)






module.exports=router;