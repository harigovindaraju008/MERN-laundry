const mongoose = require('mongoose');
const bookingSchema = mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "users"
        },
        userName:String,
        acceptDateStart:Date,
        deliveryDateEnd:Date,
        pickupDate:String,
        deliveryDate:String,
        serviceId:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "services"
        },
        bookingStatus:String,
        rejectReason:String,
        specialNotes:String,
        amount:String,
        payments:{
        paymentMethod:String,
        amount:String,
        paymentStatus:String
        },
        bookingUnits:[{
            unitName:String,
            unitQty:Number,
            unitRate:Number
        }]
    },{timestamps:true}
    );
    const booking = mongoose.model("bookings",bookingSchema);
    module.exports=booking;