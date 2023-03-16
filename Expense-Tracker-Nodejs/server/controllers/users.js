const User = require('../models/users')


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
        const existingUser = await User.findOne({where:{ email: email }});
        console.log(existingUser); 
        if(existingUser){
          return  res.status(201).send('User already exists')
        }
        //password security
         const saltrounds=10;
         bcrypt.hash(password,saltrounds,async(err,hash)=>{
            console.log(err)
            await User.create({
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


exports.loginUser=async(req,res,next)=>{
     
    try{
         console.log(req.body);
         const {email,password} = req.body;
         //find user in db
         const user = await User.findAll({where:{email}});
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