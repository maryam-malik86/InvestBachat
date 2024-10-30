
  const nodemailer = require("nodemailer");
  require("dotenv").config()
  
  const transporter = nodemailer.createTransport({
    service:'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.USER,
      pass: process.env.APP_PASSWORD,
    },
  });
  
  const mailOptions = {
      from: {
          name: 'Invest bachat',
          addresss: process.env.USER
      }, // sender address
      to: ["usamamb300@gmail.com"], // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    }
  
    const sendEmail = async (transporter,mailOptions) => {
      try {
        await transporter.sendMail(mailOptions);
        cosnole.log('Email sent')
      } catch (error) {
        console.log(error);
      }
    };