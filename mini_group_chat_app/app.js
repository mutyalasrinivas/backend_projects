const express = require('express');
const bodyParser = require('body-parser');

const loginRoutes = require('./routes/login');

const app= express();

app.use(bodyParser.urlencoded({extented:true}));


app.use(loginRoutes);









app.listen(3000,()=>{console.log("server running")})