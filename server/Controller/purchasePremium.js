const Razorpay = require('razorpay')
const Order = require('../Models/orders')
const { json } = require('body-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose') 

exports.createOrder= async (req,res)=>{

     try{
     const  razorpay = new Razorpay({
     key_id: process.env.RAZORPAY_KEY_ID,
     key_secret: process.env.RAZORPAY_SECRET,
     });

     const options = {
        amount: 500000,
        currency: "INR",
      };
      const orderDetails = await razorpay.orders.create(options)
      await Order.create({orderId:orderDetails.id,userId : req.user._id,status:'pending'})
      return res.status(201).json({order:orderDetails,key_id:razorpay.key_id})
    }

    catch(error){
      return res.status(401).json({success:false,message:'Authorization Failed'})
    }

}

exports.updateTransaction = async (req,res,next)=>{
    const {order_id,payment_id} = req.body;
    const user = req.user
    console.log(order_id ,payment_id)
    let session;
  try{
     session = await mongoose.startSession();
     session.startTransaction();

     await  Order.updateOne({orderId : order_id}, { $set: { paymentId: payment_id, status: 'success' } },{session})
     user.isPremium = true;
     await user.save({session})
     await session.commitTransaction();
     const token = jwt.sign({userId : user.id,premium : user.isPremium},'fullstack-project',{ expiresIn: '1d' })
     return res.status(200).json({message:'your are a premium user now',token:token})
  }
  catch(err){
      await session.abortTransaction();
      session.endSession();
      return res.status(401).json({message:"please try after sometime"})
  }
}

