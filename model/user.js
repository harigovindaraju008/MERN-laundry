const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
    {
    fname:String,
    lname:String,
    pwd:String,
    notes:String,
    email:
    {   type:String,
        unique:true },
    address:String,
    phoneNo:String,
    city:String,
    state:String,
    pincode:Number,
    zipcode:Number,
    resetPwdToken:String,
    },
    {timestamps:true,}
);

const user = mongoose.model("users",userSchema);
module.exports=user;