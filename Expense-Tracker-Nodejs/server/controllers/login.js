const Expense = require('../models/signup');
const bcrypt = require('bcrypt');

exports.loginUser=async(req,res,next)=>{
     
   try{
        console.log(req.body);
        const {email,password} = req.body;
        //find user in db
        const user = await Expense.findAll({where:{email}});
        //if the user doest not exist
        if(user.length > 0){
          bcrypt.compare(password,user[0].password,(err,result)=>{
               if(err){
                    throw new Error('Something went wrong')
                }
               if(result === true){
                    res.status(200).json({success:true,message:"user logged in succesfully"})
               }
               else{
                    return res.status(400).json({success:false,message:'password is incorrect'})
               }
          })
            
     }else{
          return res.status(404).json({success:false,message:"user does not exit"})
     } 
   }catch(err){
        console.log("login controller function error")
   }
}