const Expense = require('../models/signup');

exports.loginUser=async(req,res,next)=>{
     
   try{
        console.log(req.body);
        const {email,password} = req.body;
        //find user in db
        const user = await Expense.findOne({where:{email:email}});
        //if the user doest not exist
        if(!user){
            return res.status(404).json({message:'Invalid email'})
        }
        const isPasswordValid = await Expense.findOne({where:{password:password}});
        if(!isPasswordValid){
          return res.status(401).json({message:"Invalid password please Enter correct Pasword"})
        }

        return res.status(272).json({message:"welcome to portal"})
   }catch(err){
        console.log("login controller function error")
   }
}