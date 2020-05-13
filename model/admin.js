const mongoose = require('mongoose');
const adminSchema = mongoose.Schema(
    {
        userName:String,
        pwd:String,
        enableBooking:String
    });
    
    const admin = mongoose.model("admin",adminSchema);
    module.exports=admin;