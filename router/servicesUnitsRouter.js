const express = require('express');
const router = express.Router();
const verifyToken = require('./verifyTokenUsers');
const verifyTokenAdmin = require('./verifyTokenAdmin');
const Servicesunits = require('../model/serviceUnits');
const { saveImage, loadImage } = require("../utils/imageProcess");

router.get('/' , verifyTokenAdmin ,async (req,res) => {
    let servicesUnits =  await Servicesunits.find({});
      res.send(servicesUnits);
})

router.get('/user' ,verifyToken, async (req,res) => {
    let servicesUnits =  await Servicesunits.find({});
    let liveServices = servicesUnits.filter((data) => data.status != 'false');
    res.send(liveServices);
})


router.get("/:id/image", async (req, res) => {
    const setviceUnitsId = req.params.id;
    loadImage("serviceUnits.image", setviceUnitsId, res);
})

router.put("/status/:id",verifyTokenAdmin, async (req, res) => {

    const serviceUnitId = req.params.id;
    const serviceUnit = req.body;
    await Servicesunits.findByIdAndUpdate(serviceUnitId, {$set:{status:serviceUnit.status}}, { useFindAndModify: false });
    res.send("changed");
});

router.post('/add', verifyTokenAdmin,async (req,res) =>
{
   
    let  reqUnits = new Servicesunits(
        req.body
    )
    let SavedUnits = await reqUnits.save();
    try {
        //if (req.file && req.file.fieldname === "bannerImage" && savedProgram.id) {
        if (req.files && req.files.serviceUnitsImage) {
            let serviceUnitsImage = req.files.serviceUnitsImage;
            let fileName = "" + SavedUnits._id;
            saveImage("serviceUnits.image", serviceUnitsImage, fileName);
        }
        else{
            console.log("err in data");
        }
    }
    catch (err) {
        console.log(err);
    } 
    
    
    res.send(SavedUnits);


})


router.put("/update/:id",verifyTokenAdmin, async (req, res) => {
    const servicUnitId = req.params.id;
    const serviceUnit = req.body;
    await Servicesunits.findByIdAndUpdate(servicUnitId, serviceUnit, { useFindAndModify: false });
    const SavedUnits = await Servicesunits.findById(servicUnitId);
    try {
        if (req.files && req.files.serviceUnitsImage) {
            console.log("data coming");
            let serviceUnitsImage = req.files.serviceUnitsImage;
            let fileName = "" + SavedUnits._id;
            saveImage("serviceUnits.image", serviceUnitsImage, fileName);
        }
        else{
            console.log("err in data");
        }
    }
    catch (err) {
        console.log(err);
    }
    res.send(SavedUnits);
})



module.exports = router;