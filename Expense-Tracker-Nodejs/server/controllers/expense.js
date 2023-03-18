const Expense = require('../models/expense');

exports.addExpense = async(req,res,next)=>{
    try{
         console.log(req.body);
         const money= req.body.money;
         const description = req.body.description;
         const category = req.body.category;

         const expense = await Expense.create({
            money:money,
            description:description,
            category:category,
            userId:req.user.id
         })
          res.status(200).send("successfully send expense to db")
    }catch(err){
        console.log("expense controller err------>"+err)
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