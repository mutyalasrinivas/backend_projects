const Sequelize = require('sequelize');
const sequelize= require('../util/database');

const User = sequelize.define('users',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey: true
    },
    name:{
        type:Sequelize.STRING,
        // defaultValue:''
    },
      
    email: {
        type:Sequelize.STRING,
        //defaultValue:''
    },
    phone:{
        type:Sequelize.STRING,
       // defaultValue:'' 
    } 
},{
    timestamps:false
});
module.exports=User;