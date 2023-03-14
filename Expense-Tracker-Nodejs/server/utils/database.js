const Sequelize = require("sequelize");
const sequelize = new Sequelize('expense','root','sri9912',{
    dialect:"mysql",
    host:"localhost"
})


module.exports=sequelize;