 const Sequelize = require('sequelize');
 const sequelize = new Sequelize('node-complete','root','sri9912',{
     dialect : 'mysql',
     host : 'localhost'
     
 });

 module.exports = sequelize;

 