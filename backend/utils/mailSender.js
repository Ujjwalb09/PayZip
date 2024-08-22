const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    // Create a Transporter to send emails

    var smtpConfig = {
      host: process.env.MAIL_HOST,
      port: 465,
      secure: true, // use SSL for port 465
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    };

    let transporter = nodemailer.createTransport(smtpConfig);

    // Send emails to users
    let info = await transporter.sendMail({
      from: "Payments App",
      to: email,
      subject: title,
      html: body,
    });
    return info;
  } catch (error) {
    console.log("Error" + error.message);
  }
};
module.exports = mailSender;
