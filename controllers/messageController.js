// import Message from "../models/Message.js";
// import { io } from "../server.js";
import nodemailer from "nodemailer";
// export const messageController = async (req, res) => {
//   try {
//     const { sender, receiver, message } = req.body;
//     const newMessage = new Message({ sender, receiver, message });
//     await newMessage.save();
//     io.emit(`message:${receiver}`, newMessage);

//     res.status(200).json({ success: true });
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
// export const getMessages = async (req, res) => {
//   try {
//     const messages = await Message.find();
//     res.status(200).json(messages);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
// export const createMessage = (io) => async (req, res) => {
//   try {
//     const { sender, receiver, message } = req.body;
//     // Save the message to the database
//     const newMessage = new Message({ sender, receiver, message });
//     await newMessage.save();
//     // Emit the message to the receiver's socket
//     io.to(receiver).emit("newMessage", newMessage);
//     res.status(200).json({ success: true });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export const sendEmail = async (req, res) => {
//   const { to, subject, message } = req.body;

//   try {
//     // Create a transporter object using your email service provider's SMTP configuration
//     let transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         type: 'OAuth2',
//         user: process.env.MAIL_USERNAME,
//         pass: process.env.MAIL_PASSWORD,
//         clientId: process.env.OAUTH_client_id,
//         clientSecret: process.env.OAUTH_client_secret,
//         refreshToken: process.env.OAUTH_REFRESH_TOKEN
//       }
//     });

//     // Compose the email options
//     const mailOptions = {
//       from: "admin@gmail.com",
//       to: to,
//       subject: subject,
//       text: message,
//     };

//     // Send the email
//     await transporter.sendMail(mailOptions);

//     res.status(200).json({ success: true, message: "Email sent successfully" });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     res.status(500).json({ success: false, error: "Failed to send email" });
//   }
// };

// const nodemailer = require("nodemailer");
// const express = require("express");
// const app = express();

// Other configurations and middleware setup

// export const sendEmail =async (req, res) => {
//   const {  subject, message } = req.body;

//   try {
//     // Create a transporter object using your email service provider's SMTP configuration
//     let transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         type: "OAuth2",
//         user: process.env.MAIL_USERNAME,
       
//         clientId: process.env.OAUTH_CLIENT_ID,
//         clientSecret: process.env.OAUTH_CLIENT_SECRET,
//         refreshToken: process.env.OAUTH_REFRESH_TOKEN,
//       },
//     });
//     transporter.verify((err, success) => {
//       err
//         ? console.log(err)
//         : console.log(`=== Server is ready to take messages: ${success} ===`);
//      });
//     // Compose the email options
//     const mailOptions = {
//       from: "admin@gmail.com",
//       to:"user@gmail.com",
//       subject: subject,
//       text: message,
//     };

//     // Send the email
//     await transporter.sendMail(mailOptions);

//     res.status(200).json({ success: true, message: "Email sent successfully" });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     res.status(500).json({ success: false, error: "Failed to send email" });
//   }
// };

// Start the server
// app.listen(8081, () => {
//   console.log("Server is running on port 8081");
// });

// export const sendEmail =async (req, res) => {
 
//     let mailOptions = {
//       from: "test@gmail.com",
//       to: process.env.EMAIL,
//       subject: "Nodemailer API",
//       text: "Hi from your nodemailer API",
//     };
   
//     transporter.sendMail(mailOptions, function (err, data) {
//       if (err) {
//         console.log("Error " + err);
//       } else {
//         console.log("Email sent successfully");
//         res.json({ status: "Email sent" });
//       }
//     });
  
   
//     let transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         type: "OAuth2",
//         user: process.env.EMAIL,
//         pass: process.env.WORD,
//         clientId: process.env.OAUTH_CLIENTID,
//         clientSecret: process.env.OAUTH_CLIENT_SECRET,
//         refreshToken: process.env.OAUTH_REFRESH_TOKEN,
//       },
//      });
//      transporter.verify((err, success) => {
//       err
//         ? console.log(err)
//         : console.log(`=== Server is ready to take messages: ${success} ===`);
//      });
     
//      app.post("/sendEmail", function (req, res) {
//       let mailOptions = {
//         from: `${req.body.mailerState.email}`,
//         to: process.env.EMAIL,
//         subject: `Message from: ${req.body.mailerState.email}`,
//         text: `${req.body.mailerState.message}`,
//       };
     
//       transporter.sendMail(mailOptions, function (err, data) {
//         if (err) {
//           res.json({
//             status: "fail",
//           });
//         } else {
//           console.log("== Message Sent ==");
//           res.json({
//             status: "success",
//           });
//         }
//       });
//      })}
// server.js




const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    EMAIL: process.env.EMAIL,
    WORD: process.env.WORD,
    CLIENT_ID: process.env.OAUTH_CLIENTID,
    CLIENT_SECRET: process.env.OAUTH_CLIENT_SECRET,
    REFRESH_TOKEN: process.env.OAUTH_REFRESH_TOKEN,
  },
});

transporter.verify((err, success) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is ready to take messages: ${success}`);
  }
});

export const sendEmail = async (req, res) => {
  const mailOptions = {
    to: req.body.mailerState.email,
    from: process.env.EMAIL,
    subject: `Message from: ${req.body.mailerState.email}`,
    text: req.body.mailerState.message,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log('Error:', err);
      res.json({ status: 'fail' });
    } else {
      console.log('Email sent successfully');
      res.json({ status: 'success' });
    }
  });
};


