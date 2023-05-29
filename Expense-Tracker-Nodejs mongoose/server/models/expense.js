const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    money:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
      }
});

module.exports= mongoose.model('Expense',expenseSchema);


// const Sequelize = require('sequelize');
// const sequelize = require('../utils/database');

// const Expense = sequelize.define('expenses',{
//     id:{
//         type:Sequelize.INTEGER,
//         autoIncrement:true,
//         primaryKey:true
//     },
//     money:{
//         type:Sequelize.INTEGER
//     },
//     description:{
//         type:Sequelize.STRING
//     },
//     category:{
//         type:Sequelize.STRING
//     }
// });

// module.exports=Expense;

