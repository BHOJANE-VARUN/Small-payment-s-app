const express = require("express");
const router = express.Router();
const { User ,Bank} = require("../db");
const mongoose = require("mongoose");

const jwtverification = require("../middlewares/userauth.js");
router.use(jwtverification);

router.get("/balance",async (req,res)=>{
    const users =await User.findOne({username:req.username});
    const bankuser = await Bank.findOne({user_id:users._id});
    res.status(200).json({
        Balance:bankuser.Balance,
    })
})
function isNumeric(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
  }

  
router.post("/transfer",async (req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    const {to,amount} = req.body;
    const user = await Bank.findOne({user_id:req.userid}).session(session);
    
    if(!isNumeric(amount))
    {
        session.abortTransaction();
        return res.status(411).json({
            message:"Invalid input",
        });
    }
    if(!user || user.Balance<amount)
    {
        await session.abortTransaction();
        return res.status(411).json({
            message:"Insufficient Balance",
        });
    }
    const toAccount = await Bank.findOne({user_id:to}).session(session);    
    if(!toAccount)
    {
        session.abortTransaction();
        return res.status(411).json({
            message:"User not found",
        });
    }
    await Bank.updateOne({user_id:to},{
        $inc:{
            Balance:amount,
        }
    }).session(session);
    await Bank.updateOne({user_id:req.userid},{
        $inc:{
            Balance:-amount,
        }
    }).session(session);
    await session.commitTransaction();
    res.status(200).json({
        message:"Transaction successful",
    })
})
module.exports = router;
