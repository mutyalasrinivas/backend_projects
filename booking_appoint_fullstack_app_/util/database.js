const Sequelize = require('sequelize');
const sequelize =new Sequelize('node-complete','root','sri9912',{
    host:'localhost',
    dialect:'mysql'
})


module.exports=sequelize;