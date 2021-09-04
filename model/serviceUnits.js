const mongoose = require('mongoose');
const serviceUnitSchema = mongoose.Schema(
    {
        unitName:String,
        minLimit:Number,
        maxLimit:Number,
        price:Number,
        status:String,
        qty:String,
    });

    const serviceUnits = mongoose.model("serviceUnits",serviceUnitSchema);
    module.exports=serviceUnits;