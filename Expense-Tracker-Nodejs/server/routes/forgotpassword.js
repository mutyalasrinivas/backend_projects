const express =require('express');
 
const {forgotpassword} = require('../controllers/forgotpassword')


const router = express.Router();


router.post('/password/forgotpassword',forgotpassword)


module.exports = router;