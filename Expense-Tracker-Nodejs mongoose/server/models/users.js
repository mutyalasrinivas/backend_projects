 const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
   name:{
    type:String,
    required:true
   },
   email:{
    type:String,
    required:true
   },
   password:{
    type:String,
    required:true
   },
   ispremiumuser:Boolean,
   totalExpenses:{
    type:Number,
     defaultValue:0
    }
})

module.exports = mongoose.model('User',userSchema);



// const User = sequelize.define('users',{
//     id:{
//         type:Sequelize.INTEGER,
//         autoIncrement:true,
//         primaryKey:true
//     },
//     name:{
//         type:Sequelize.STRING,
        
//     },
//     email:{
//         type:Sequelize.STRING,
//         unique:true,
//     },
//     password:{
//         type:Sequelize.STRING,
//     },
//     ispremiumuser:Sequelize.BOOLEAN,
//     totalExpenses: {
//         type: Sequelize.INTEGER,
//         defaultValue: 0
//       }
// })
   

// module.exports=User;