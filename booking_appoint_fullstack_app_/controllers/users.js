const User = require('../models/users');
 
 
 exports.addUser =async(req,res,next)=>{
    try{
          if(!req.body.phone){
            throw new Error('number is needed');
          }
        const name = req.body.name;
        const email=req.body.email;
        const phone=req.body.phone;
     
        const data=await User.create({
            name:name,
            email:email,
            phone:phone
        });
        res.json();
        res.status(201).json({newuserdetail:data});
       }
          catch(err){
            console.log(err);
            res.status(500).json({
                error:err
            })
          }
 }

 exports.getUser= async (req , res ,next)=>{
    try{
        const users= await User.findAll();
        res.status(200).json({allusers:users});
    } 
    catch(err){
        res.status(500).json({error:err})
    }
     
  }

   
  exports.deleteUser=async(req,res)=>{
    try{
        if(req.params.id=='undefined'){
            console.log('id misssing.....');
            return res.status(400).json({err:"id of the user missing"});
        }
          const uId= req.params.id;
          await User.destroy({where:{id:uId}});
          console.log("succesfully deleted");
          res.status(200).send("Successfully deleted");
    }catch(err){
          console.log(err);
          res.status(500).json({error:err});
    } 
  }
