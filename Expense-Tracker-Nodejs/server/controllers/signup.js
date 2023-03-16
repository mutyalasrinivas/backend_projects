const { where } = require('sequelize');
const Expense = require('../models/signup');
const bcrypt = require('bcrypt');
 
exports.postUser= async(req,res,next)=>{
   
   try{
      console.log(req.body);
       const name=req.body.name;
       const email=req.body.email;
       const password=req.body.password;

       // Check if any required field is missing
        if (!name || !email || !password) {
         return res.status(400).send('Missing required field(s)');
         }
        // Check if user already exists
        const existingUser = await Expense.findOne({where:{ email: email }});
        console.log(existingUser); 
        if(existingUser){
          return  res.status(201).send('User already exists')
        }
        //password security
         const saltrounds=10;
         bcrypt.hash(password,saltrounds,async(err,hash)=>{
            console.log(err)
            await Expense.create({
               name:name,
               email:email,
               password:hash
               })
            console.log("successfully send data to db");
            res.status(201).send("success post to db")
         })

        //create new user
      
   }catch(err){
      console.log("post error: " + err);
      res.status(500).send("Error occurred while posting to database");
   }
}