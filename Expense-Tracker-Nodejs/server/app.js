
const express = require("express");
const fs= require('fs');
const path = require('path');
 
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan =require('morgan');
 const sequelize = require('../server/utils/database');
const User=require('../server/models/users');
const Expense = require('../server/models/expense')
const userRoutes=require('../server/routes/users')
const expenseRoutes=require('../server/routes/expense');
const purchaseRoutes = require('../server/routes/purchase')
const premiumRoutes = require('../server/routes/premium');
const resetPasswordRoutes = require('./routes/resetpassword');
const Order = require("./models/orders");
const Forgotpassword = require('./models/forgotpassword');
const DownloadedFile =require('../server/models/downloadedfile');
const accessLogStream = fs.createWriteStream(
    path.join(__dirname,'access.log'),
    {flags:'a'}
);
const app = express();
dotenv.config();





app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());
app.use(express.json());
app.use('/user',userRoutes);
app.use('/expense',expenseRoutes);
app.use('/purchase',purchaseRoutes)
app.use('/premium',premiumRoutes)
app.use('/password',resetPasswordRoutes);
app.use(helmet());
app.use(morgan('combined',{stream:accessLogStream}));

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

User.hasMany(DownloadedFile);
DownloadedFile.belongsTo(DownloadedFile);

sequelize.sync()
.then(()=>{
    app.listen(process.env.PORT || 3000,()=>console.log("server running"))
})
.catch((err)=>{
    console.log("err------>>>>"+err);
})






 