const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://varunbhojane07:Varunbhojane07@varun-cluster.cv4xb.mongodb.net/Paytm")
.then(()=>{
    console.log("database connected..");
})
const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        minLength:2,
        maxLength:30
    },
    password:{
        type:String,
        required:true,
        minLength:8,
    },
    firstname:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    lastname:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
})
const BankSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"users",
    },
    Balance:{
        type:Number,
        required:true,
    },
})
const User = mongoose.model("users",UserSchema);
const Bank = mongoose.model("banks",BankSchema);
module.exports = {
    User,
    Bank
}