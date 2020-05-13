const jwt = require("jsonwebtoken");
const Admin = require('../model/admin');

module.exports = async function verifyToken (req, res, next) {
    const token = req.header("admin_token");
     let adminId = await Admin.find({});
    const user = {
        loginId: adminId[0].userName
    }
    const secretKey = "12345";

    if (!token) {
        return res.status(403).send('Access-Denied');
    }
    try {
        const verifiedUser = jwt.verify(token, secretKey);
        if (verifiedUser.loginId == user.loginId) {
            req.user = verifiedUser;
            next();
        }
        else {
            res.status(400).send("Invalid Login");
        }

    }
    catch (err) {
        console.log(err);
        res.status(400).send("Invalid Token");
    }
} 

