const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    // Create a Transporter to send emails

    var smtpConfig = {
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // use SSL for port 465
      auth: {
        user: "ujjwalbhatt09@gmail.com",
        pass: "yvdmivkhvyzkrxog",
      },
      tls: {
        rejectUnauthorized: false,
      },
    };

    let transporter = nodemailer.createTransport(smtpConfig);

    // Send emails to users
    let info = await transporter.sendMail({
      from: "www.sandeepdev.me - Sandeep Singh",
      to: email,
      subject: title,
      html: body,
    });
    console.log(" Line 22 Email info: ", info);
    return info;
  } catch (error) {
    console.log("Error" + error.message);
  }
};
module.exports = mailSender;
