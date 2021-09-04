const express = require("express");
const router = express.Router();
const verifyToken = require("./verifyTokenUsers");
const verifyTokenAdmin = require('./verifyTokenAdmin');
const Booking = require("../model/booking");
const Service = require("../model/services");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const sendMail = require('../utils/sendmail');


router.get('/admin/booking', verifyTokenAdmin,async (req,res) =>
{
  let allBookings = await Booking.find({}).populate('userId').populate("serviceId").sort({ '_id': -1 })
  let book = await Booking.countDocuments();
  console.log(book);
  res.status(200).send(allBookings);
});

router.get('/admin/booking/:id',verifyTokenAdmin,async (req,res) =>
{
  let bookingid = req.params.id;
  console.log(bookingid);
  let allBookings = await Booking.find({}).populate('userId').populate("serviceId").sort({ '_id': -1 })
  let userBookings = await allBookings.filter( (data) => data.userId.email === bookingid );
  if(userBookings.length <= 0)(res.status(400).send("there is no booking for this email address"));
  else{res.status(200).send(userBookings)}
});





router.get("/info", verifyToken, async (req, res) => {
  const userData = jwt.verify(req.token, req.key);
   console.log(userData);
   console.log("hari");
  let reqUser = await User.findOne({ email: userData.email }).select(["_id"]);
  let bookings = await Booking.find({ userId: reqUser._id }).populate("serviceId").sort({ '_id': -1 });
  //   Booking.aggregate([
  //     { $lookup:
  //         {
  //           from: 'services',
  //           localField: '_id',
  //           foreignField: 'serviceId',
  //           as: 'bookingUnits'
  //         }
  //       }
  // ],(err,data) =>{
  //     if(err) (res.send(err))
  //         res.send(data);
  // })
  // .toArray((err,data) =>
  // { if(err) (res.send(err))
  //     res.send(data);
  // }
  // )
  res.send(bookings);
});

router.put("/update", verifyToken, async (req, res) => {
  let bookingid = req.body;
  console.log(bookingid, bookingid.id);
  await Booking.findByIdAndUpdate(
    bookingid.id,
    { $set: { bookingStatus: "Canceled" , rejectReason:bookingid.rejectReason} , upsert: true  },
   { new : true},
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
      res.status(200).send(result);
    }
  );
});

router.put("/adminCancel/:id",verifyTokenAdmin, async (req, res) => {
  let bookingid = req.params.id;
  let message = req.body;
    console.log(bookingid);
   let result = await Booking.findByIdAndUpdate(
    bookingid,
    { $set: { bookingStatus:message.bookingStatus} },
    (err, result) => {
      if (err) {
        console.log(err);
        return err
      }
      return result
    }
  );
  res.status(200).send(result);
});

router.post("/", verifyToken, async (req, res) => {
  let booking = req.body;
  // console.log(booking);
  const userData = jwt.verify(req.token, req.key);
  if (userData) {
    let reqUser = await User.findOne({ email: userData.email }).select([
      "-pwd",
    ]);
    if (reqUser) 
     {
    let service = await  Service.findOne({serviceName:booking.serviceName});
     if(service)
    {
    let reqbooking = Booking({
      userId: reqUser._id,
      userName: reqUser.fname + reqUser.lname,
      pickupDate: booking.pickupDate,
      deliveryDate: booking.deliveryDate,
      serviceId: service._id,
      specialNotes: booking.specialNotes,
      bookingStatus: "requested",
      payments:booking.payments,
      bookingUnits:booking.bookingUnits
    });

    let resBookings = await reqbooking.save();
    if (resBookings) 
    {
    let bookinfInfo = await Booking.findById(resBookings._id).populate('userId').populate("serviceId");
    // sendMail(bookinfInfo,service.serviceName,reqUser.email,"bookingInfo");
    console.log("mail send");
    res.status(200).send("Thanks for booking");
    }
    else(res.status(401).send("booking details didn't store"))
  }
  else (res.status(401).send("service details invaild"))
  }
  else (res.status(401).send("User details invaild "));
  } else
   {
    res.status(401).send("invalid token");
  }
});
module.exports = router;
