
const Razorpay = require('razorpay');
const Order = require('../models/orders')
const User=require('../models/users')
const userController= require('./users')
exports.purchasepremium = async (req, res) => {
    try {
      const rzp = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
      });
  
      const amount = 2500;
      rzp.orders.create({ amount, currency: 'INR' }, async (err, order) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: err.message });
        }
   
        const paymentId = order.id;
        const newOrder = new Order({
          orderid: order.id,
          status: 'PENDING',
          userId:req.user._id,
          paymentid:paymentId
        });
        await newOrder.save();
        res.status(201).json({ order, key_id: rzp.key_id });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  };

exports.updateTransactionStatus = async(req,res)=>{
    try{
        const userId = req.user._id;
        const {paymentid,orderid} = req.body;
        const order = await Order.findOne({orderid:orderid});
        if(!order){
            return res.status(404).json({message:'Order not found'});
        }
        order.paymentid= paymentid;
        order.status='SUCCESSFUL';
        const updatedOrder = await order.save();
        const user= await User.findById(userId);
        if(!user){
            return res.status(404).json({message:'User not found'});
        }
        user.ispremiumuser=true;
        await user.save();
        const token=userController.generateAccessToken(userId,user.name,true);
        res.status(202).json({success:true,message:'Transaction Successful',token});
           
    }catch(err){
       console.log(err);
       res.status(403).json({error:err, message:'Something went wrong'})
    }
}

















// const Razorpay = require('razorpay');
// const Order = require('../models/orders')
// const userController= require('./users')
// exports.purchasepremium = async (req,res)=>{
//     try{
//         var rzp = new Razorpay({
//             key_id: process.env.RAZORPAY_KEY_ID,
//             key_secret: process.env.RAZORPAY_KEY_SECRET
//         })
//         const amount = 2500;
//         rzp.orders.create({amount,currency:"INR"},(err,order)=>{
//             if(err){
//                 console.log(err)
//                 throw new Error(JSON.stringify(err));
//             }
//             req.user.createOrder({orderid: order.id,status:'PENDING'}).then(()=>{
//                 return res.status(201).json({order,key_id:rzp.key_id});
//             }).catch(err=>{
//                 throw new Error(err)
//             })
//         })
//     }catch(err){
//            console.log(err);
//     }
// }

// exports.updateTransactionStatus = async(req,res)=>{
//     try{
//         const userId = req.user.id;
//         const {payment_id,order_id} = req.body;
//         const order = await Order.findOne({where:{orderid:order_id}})
//         const promise1= order.updateOne({ paymentid: payment_id,status:'SUCCESSFUL'})
//         const promise2= req.user.updateOne({ ispremiumuser: true})

//         Promise.all([promise1,promise2]).then(()=>{
//             return res.status(202).json({success:true,message:"Transaction Successful",token:userController.generateAccessToken(userId,req.user.name,true)});
//         }).catch((error)=>{
//             throw new Error(error);
//         })
         
//     }catch(err){
//        console.log(err);
//        res.status(403).json({error:err, message:'Something went wrong'})
//     }
// }