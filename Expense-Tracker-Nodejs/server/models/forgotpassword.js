const mongoose=require('mongoose');

const Schema = mongoose.Schema;

const forgotpasswordSchema =new Schema({
   active:{
    type:String,
    required:true
   },
   expiresby:{
    type:String,
    required:true
   }
})

module.exports=mongoose.model('Forgotpassword',forgotpasswordSchema);








// const Sequelize = require('sequelize');
// const sequelize = require('../utils/database');

// const Forgotpassword = sequelize.define('forgotpassword',{
//     id:{
//         type:Sequelize.UUID,
//         allowNull:false,
//         primaryKey:true
//     },
//     active:Sequelize.BOOLEAN,
//     expiresby:Sequelize.DATE
// })

// module.exports = Forgotpassword;