const express = require("express");
const app = express();
const bodyPaser = require("body-parser");
const mongoose = require("mongoose");
const admin = require("./router/adminRouter");
const booking = require("./router/bookingRouter");
const services = require("./router/servicesRouter");
const serviceUnits = require("./router/servicesUnitsRouter");
const user = require("./router/userRouter");
const fileUpload = require("express-fileupload");
const path = require("path");
var cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/admin", admin);
app.use("/booking", booking);
app.use("/services", services);
app.use("/serviceUnits", serviceUnits);
app.use("/user", user);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build")); // change this if your dir structure is different
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 4001;
const mongoDBUrl = process.env.MONGODB_URL;
mongoose.set("useCreateIndex", true);
mongoose
  .connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("mongodb connected succesfully");
    app.listen(port, () => console.log(`backend is listening on port ${port}`));
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });
