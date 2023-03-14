const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
 const sequelize = require('../server/utils/database');
const Expense=require('../server/models/signup');
const signupRoutes=require('../server/routes/signup')
const signupControllers=require('../server/controllers/signup')
const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());
app.use(express.json());
app.use(signupRoutes);
 



sequelize.sync()
.then(()=>{
    app.listen(3000,()=>console.log("server running"))
})
.catch((err)=>{
    console.log("err------>>>>"+err);
})






 