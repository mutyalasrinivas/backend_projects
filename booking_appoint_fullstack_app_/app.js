const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/users');
const axios = require('axios');
const { urlencoded } = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
app.use(cors());

app.use(userRoutes);

const users = require('./models/users')


sequelize
.sync()
.then((result=>{
 app.listen(3000,()=>console.log("server running"))
}))
.catch(err=>{
    console.log(err)
})

 