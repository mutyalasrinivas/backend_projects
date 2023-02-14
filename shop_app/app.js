const path=require('path');
const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes=require('./routes/admin');
const shopRoutes = require('./routes/shop');
const contactRoutes=require('./routes/contact')

 

const app = express();

const productController=require('./controllers/product')
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')));
app.use(contactRoutes);
app.use('/admin',adminRoutes);
app.use('/shop',shopRoutes);

app.use( productController.pageNot)











app.listen(3000,()=>{console.log("server running")});