const express = require('express');
const router = express.Router();
const verifyToken = require('./verifyTokenUsers');
const User = require('../model/user');
const Admin = require('../model/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendmail = require('../utils/sendmail');

router.get('/' , verifyToken, async (req,res) => {
     
     const userData = jwt.verify(req.token,req.key);
     console.log(userData);
     let reqUser =  await User.findOne({email:userData.email}).select(['-pwd']);
     res.send(reqUser);
})

 router.post('/register' ,  async (req,res) => {
  let user = req.body;
  console.log(user);
   try {
    let existingEmail = await User.findOne({email:user.email});
       if(existingEmail)
       {
        return  res.status(400).send("email is already exist");
       }
       
       let hash = await bcrypt.hash(user.pwd,10); 
       let userDetails = User({
        fname:user.fname,
        lname:user.lname,
         pwd:hash,
         notes:user.notes,
        email:user.email,
        address:user.address,
        phoneNo:user.phoneNo,
       city:user.city,
       state:user.state,
       zipcode:user.zipcode  
   });
   let savedDetails = await userDetails.save();
   console.log(savedDetails);
   if(savedDetails)(res.status(200).send(savedDetails))
   else(res.status(400).send("sever busy"))
   
  } catch(err)
   {
     res.status(400).send(err);
   }
});

router.post('/login' , async (req,res) => {
  try {
  let user = req.body;
  console.log(user);
  let exactUser = {email:user.email}
  let reqUser =  await User.find(exactUser);
  console.log(reqUser);
  if(reqUser.length <=0)
    {
      let admin = await Admin.find({userName:user.email})
      if(admin <=0)
      {
        return res.status(400).json("email incorrect!!!")
      }
      else if(admin[0].pwd !== user.pwd)(res.status(401).json("password incorrect!!!"))
      else if(admin)
      { 
          const user = {
              loginId: admin[0].userName
          }
          const secretKey = "12345";
          const token = jwt.sign(user, secretKey);
          res.status(200).header({ "admin_token": token }).json({ "admin_token": token});   
      }
      else(res.status(401).json( "Invalid username or password"))
      console.log("pwd")
    }
   else if (reqUser)
   {
  let pwd =  await bcrypt.compare(user.pwd,reqUser[0].pwd);
  // console.log(pwd);
  if(!pwd)(res.status(400).json(" password incorrect!!!"));
  else
  {const userData = {email:reqUser[0].email};
  const secretKey = "12345";
  const token = jwt.sign(userData, secretKey);
  res.status(200).header({ "auth_token": token }).json({ "auth_token": token });
   }
   }
  } catch(err)
  {
    res.status(400).send(err);
  }
})


router.put("/update",verifyToken , async (req,res) =>
{
  try{
     let user = req.body;
     const userData = jwt.verify(req.token,req.key);
     console.log(user);
     await User.findOneAndUpdate({email:userData.email},user);
     res.send("success");
  }catch(err)
  {
    res.status(400).send(err);
  }
})


router.post('/forgotPassword/:id', async(req,res) =>
{
  let emailId = req.params.id ;
  let verifyemail = await User.findOne({email:emailId});
  // console.log(verifyemail);
  try
  {
  if(!verifyemail)(res.status(200).send("forgot request canceled"))
   else{
    const userId = {_id:verifyemail._id}
   const secretKey = "12345"
   const token = jwt.sign(userId, secretKey,{expiresIn:1800});
   await User.findByIdAndUpdate(verifyemail._id,{$set:{resetPwdToken:token},upsert:true})
   sendmail(token,"Forgot password request",verifyemail,"forgotPwd");
   res.status(200).send("forgot request sended");
   }
  }
  catch(err)
  {
    console.log(err);
  }

})

router.post('/resetPwd/:token',async(req,res)=>
{
  let token = req.params.token;
  let pwd = req.body;
  console.log(pwd);
  let secretKey = "12345"
  let userID = jwt.decode(token,secretKey);
  if(userID === null)(res.status(400).send("change request canceled"))
  {
  let verifyUser = await User.findById(userID._id)
  if(!verifyUser)(res.status(400).send("change request canceled"))
  else if(verifyUser.resetPwdToken === token)
  {
    let hash = await bcrypt.hash(pwd.password,10); 
    await User.findByIdAndUpdate(verifyUser._id,{$set:{pwd:hash,resetPwdToken:""}})
    res.status(200).send("password is changed");
  }
  else{res.status(400).send("change request canceled")}
}
})


module.exports = router;