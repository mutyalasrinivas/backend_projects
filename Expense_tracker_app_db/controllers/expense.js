const Expense=require('../models/expense');

exports.postList= async(req,res,next)=>{
    try{
        const amount=req.body.amount;
        const description=req.body.description;
        const category=req.body.category;
        await Expense.create({
            amount:amount,
            description:description,
            category:category
         })
         console.log("successfully expense created")
         res.status(200).send("success post to db")
    }catch(err){
         console.log("err---->>>>>"+err);
         res.status(500).send("unable to post to db");
    }
}

 
exports.getList = async (req, res, next) => {
   try {
     const expenses = await Expense.findAll();
     res.status(200).json({ allexpenses: expenses });
   } catch (err) {
     console.log('Error getting expenses:', err);
     res.status(500).send('Error getting expenses');
   }
 };
exports.deleteList = async (req, res, next) => {
   try {
     const expenseId = req.params.id;
     const expense = await Expense.findByPk(expenseId);
 
     if (!expense) {
       return res.status(404).send('Expense not found');
     }
 
     await expense.destroy();
     res.status(200).send('Expense deleted successfully');
   } catch (err) {
     console.log('Error deleting expense:', err);
     res.status(500).send('Error deleting expense');
   }
 };