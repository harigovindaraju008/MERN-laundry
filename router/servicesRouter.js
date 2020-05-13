const express = require('express');
const router = express.Router();
const verifyToken = require('./verifyTokenUsers');
const verifyTokenAdmin = require('./verifyTokenAdmin');
const Services = require('../model/services');
const { saveImage, loadImage } = require("../utils/imageProcess");

router.get('/admin/service',verifyTokenAdmin ,async (req,res) => {
    let services =  await Services.find({});
    res.send(services);
})

router.get("/:id/image", async (req, res) => {
    const setviceId = req.params.id;
    loadImage("service.image", setviceId, res);
})

router.get('/user/service', verifyToken ,async (req,res) => {
    let services =  await Services.find({});
    let liveServices = services.filter((data) => data.status != 'false');
    console.log(liveServices);
    res.send(liveServices);
})


router.post('/admin/addService',verifyTokenAdmin, async (req,res) =>
{
  
  
    let  reqServices = new Services(
        req.body
    )
    console.log(req.body);
    let savedServices = await reqServices.save();
    
    try {
        //if (req.file && req.file.fieldname === "bannerImage" && savedProgram.id) {
        if (req.files && req.files.serviceImage) {
            let serviceImage = req.files.serviceImage;
            let fileName = "" + savedServices._id;
            saveImage("service.image", serviceImage, fileName);
        }
        else{
            console.log("err in data");
        }
    }
    catch (err) {
        console.log(err);
    }
    res.send(savedServices);
})

router.put("/status/:id",verifyTokenAdmin, async (req, res) => {

    const serviceId = req.params.id;
    const service = req.body;
    console.log(serviceId);
    await Services.findByIdAndUpdate(serviceId, {$set:{status:service.status}}, { useFindAndModify: false });
    res.send("changed");
});

router.put("/update/:id",verifyTokenAdmin, async (req, res) => {
    const serviceId = req.params.id;
    const service = req.body;
    await Services.findByIdAndUpdate(serviceId, service, { useFindAndModify: false });
    const updatedService = await Services.findById(serviceId);
    try {
        if (req.files && req.files.serviceImage) {
            console.log("data coming");
            let serviceImage = req.files.serviceImage;
            let fileName = "" + updatedService._id;
            saveImage("service.image", serviceImage, fileName);
        }
        else{
            console.log("err in data");
        }
    }
    catch (err) {
        console.log(err);
    }
    res.send(updatedService);
})

router.post('/video',async(req,res) =>
{
    try {
        if (req.files && req.files.serviceVideo) {
            console.log("data coming");
            let serviceVideo = req.files.serviceVideo;
            let fileName = "harivideo"; 
            saveImage("service.video", serviceVideo, fileName);
            res.send("successs");
        }
        else{
            console.log("err in data");
        }
    }
    catch (err) {
        console.log(err);
    }

})


router.get("/video/:id", async (req, res) => {
    const setvicefile = req.params.id;
    console.log("hii");
    loadImage("service.video", setvicefile, res);
})




module.exports = router;