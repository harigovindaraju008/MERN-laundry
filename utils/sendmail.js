const nodemailer = require("nodemailer");

const ejs = require("ejs");

module.exports = async function sendMail(output, subject, userEmail,purpose) {
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === "true", // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASS
    }
  });

 if(purpose === 'bookingInfo')
 {
  ejs.renderFile(__dirname+"/emailOrder.ejs",{output:output}, async(err, data) =>
  {
    if (err) {
      console.log(err);
  } else {
    let info = await transporter.sendMail({
      from: '"Clean Thuni" <' +  process.env.EMAIL_USER + ">", // sender address
      to: [userEmail], // list of receivers
      subject: subject, // Subject line
      text: subject, // plain text body
      html: data, // html body
    });
    console.log("Message sent: %s", info.messageId);
  }
  });
}
else if (purpose === "forgotPwd" )
{
  ejs.renderFile(__dirname+"/forgotPwdLink.ejs",{output:output,userEmail:userEmail}, async(err, data) =>
  {
    if (err) {
      console.log(err);
  } else {
    let info = await transporter.sendMail({
      from: '"Clean Thuni" <' +  process.env.EMAIL_USER + ">", // sender address
      to: [userEmail.email], // list of receivers
      subject: subject, // Subject line
      text: subject, // plain text body
      html: data, // html body
    });
    console.log("Message sent: %s", info.messageId);
  }
  });

}
};
