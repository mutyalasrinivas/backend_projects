const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const exControllers=require('./controllers/expense');
const Expense = require('./models/expense');
const exRoutes=require('./routes/expense');
const sequelize=require('./util/database');

const app= express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
 
app.use(exRoutes);


sequelize.sync()
 .then((result)=>{
    app.listen(3000,()=>{
        console.log("server running");
    })
 })
 .catch(err=>console.log("app.js error-->"+err));



 