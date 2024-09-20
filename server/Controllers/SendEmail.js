const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  //creating a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  //Defining the email options
  const mailOptions = {
    from: "Your Email usamamb300@gmail.com",
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  console.log(mailOptions);

  await transporter.sendMail(mailOptions);
  console.log("Email has been sent");
};

module.exports = { sendEmail };
