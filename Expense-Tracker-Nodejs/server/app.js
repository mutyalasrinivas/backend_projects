
const express = require("express");
 
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require('dotenv');
 const sequelize = require('../server/utils/database');
const User=require('../server/models/users');
const Expense = require('../server/models/expense')
const userRoutes=require('../server/routes/users')
const expenseRoutes=require('../server/routes/expense');
const purchaseRoutes = require('../server/routes/purchase')
const premiumRoutes = require('../server/routes/premium');
const Order = require("./models/orders");

 
const app = express();
dotenv.config();
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());
app.use(express.json());
app.use('/user',userRoutes);
app.use('/expense',expenseRoutes);
app.use('/purchase',purchaseRoutes)
app.use('/premium',premiumRoutes)

 

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize.sync()
.then(()=>{
    app.listen(3000,()=>console.log("server running"))
})
.catch((err)=>{
    console.log("err------>>>>"+err);
})






 