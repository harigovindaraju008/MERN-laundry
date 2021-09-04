const mongoose = require('mongoose');
const serviceSchema = mongoose.Schema(
    {
        serviceName:String,
        status:String,
    });

    const services = mongoose.model("services",serviceSchema);
    module.exports=services;