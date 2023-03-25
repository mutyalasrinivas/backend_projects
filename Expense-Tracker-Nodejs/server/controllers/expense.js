const { NUMBER } = require('sequelize');
const Expense = require('../models/expense');
const User = require('../models/users');
const sequelize = require('../utils/database');

exports.addExpense = async(req,res,next)=>{
    try{
         console.log(req.body);
         const { money, description, category }=req.body;
         

         const expense = await Expense.create({
            money,
            description,
            category,
            userId:req.user.id
         })
         const totalExpense = Number(req.user.totalExpenses)+Number(money)
         console.log(totalExpense)
         User.update({
            totalExpenses:totalExpense
         },{
            where:{id:req.user.id}
         })
          res.status(200).send("successfully send expense to db")
    }catch(err){
        console.log("expense controller err------>"+err)
        res.status(500).send("Failed to add expense to db");
    }
}

exports.getList = async(req,res,next)=>{
    try{
        const expenses = await Expense.findAll({where:{userId:req.user.id}})
        res.status(200).json({allexpenses:expenses,success:true});
    }catch(err){
        console.log("getlist controller error---->"+err)
    }
}
exports.deleteEle= async(req,res,next)=>{
    console.log(req.body);
    console.log(req.params.id);
    const id=req.params.id;
    
    const expense = await Expense.destroy({where:{id:id}})
    console.log("deleted item"+expense)
    res.status(202).json("successfuly deleted");

}