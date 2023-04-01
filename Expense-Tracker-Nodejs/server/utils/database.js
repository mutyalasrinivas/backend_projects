const mysql = require('mysql2');
const dotenv = require('dotenv');
const Sequelize = require("sequelize");

dotenv.config();
const sequelize = new Sequelize('expense','root','sri9912',{
    dialect:"mysql",
    host:"localhost"
})
// const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USERNAME,process.env.DB_PASSWORD,{
//     dialect:"mysql",
//     host:DB_HOST
// })


module.exports=sequelize;