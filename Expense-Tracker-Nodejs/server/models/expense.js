const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Expense = sequelize.define('expenses',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    money:{
        type:Sequelize.INTEGER
    },
    description:{
        type:Sequelize.STRING
    },
    category:{
        type:Sequelize.STRING
    }
});

module.exports=Expense;

