const Sequelize=require("sequelize");

const sequelize= require('../util/database');

const Expense=sequelize.define('expenses',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    amount:{
        type:Sequelize.INTEGER
    },
    description:Sequelize.STRING,
    category:Sequelize.STRING
},{
    timestamps: false
});

module.exports=Expense;