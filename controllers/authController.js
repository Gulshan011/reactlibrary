import userModel from "../models/userModel.js";
import { comparePassword, hashpassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import { title } from "process";
import bookModel from "../models/bookModel.js";
import queryModel from "../models/queryModel.js";
import taskModel from "../models/taskModel.js";
import userTaskModel from "../models/userTaskModel.js";
import notificationModel from "../models/notificationModel.js";
import messageModel from "../models/messageModel.js";
import  nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import fs from "fs";
var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "d5ecaa07294523",
    pass: "e18fcefc1097ad"
  }
});


//--------------register api-----------------------------------------------------------------------------------------------
export const registerController = async (req, res) => {
  //register
  try {
    const {
      fname,
      lname,
      email,
      password,
      regnumber,
      role,
      dept,
      gender,
      answer,
    } = req.body;
    //validations
    if (!fname) {
      return res.send({ message: "FName is required" });
    }
    if (!lname) {
      return res.send({ message: "LName is required" });
    }
    if (!email) {
      return res.send({ message: "email is required" });
    }
    if (!password) {
      return res.send({ message: "password is required" });
    }
    if (!regnumber) {
      return res.send({ message: " required" });
    }
    if (!gender) {
      return res.send({ message: "Gender is required" });
    }
    if (!role) {
      return res.send({ message: "required" });
    }
    if (!dept) {
      return res.send({ message: "dept is required" });
    }

    //check existing user
    const existinguser = await userModel.findOne({ email });
    //existing user
    if (existinguser) {
      return res.status(200).send({
        success: false,
        message: "Already register please login",
      });
    }
    //register user
    const hashedpassword = await hashpassword(password);
    //save
    const user = await new userModel({
      fname,
      lname,
      email,
      regnumber,
      role,
      gender,
      password: hashedpassword,
      dept,
      answer,
    }).save();
    res.status(201).send({
      success: true,
      message: "User register successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registeration",
      error,
    });
  }
};

//----------------registerd users list---------------------------------------------
export const registerListController = async (req, res) => {
  try {
    const registers = await userModel.find({});

    res.json({
      success: true,
      message: " fetched successfully",
      data: registers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//-----------------------------------------------------
// login--------------------------------------------------------------------------------------------------------------------------------------
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validations
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not register",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "invalid passwords",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7days",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        regnumber: user.regnumber,
        dept: user.dept,
        role: user.role,
        gender: user.gender,
        answer: user.answer,
        query: user.query,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in login",
      error,
    });
  }
};
//forgotPasswordController-------------------------------------------------------------------------------------
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await userModel.findOne({ email });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashpassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(`error in forgot password${error}`);
    res.status(500).send({
      success: false,
      message: "Something went wrongg",
      error,
    });
  }
};
//--forgot passwrd

export const queryControllers = async (req, res) => {
  try {
    const { query, fname } = req.body;

    const user = userModel.findOne({ fname: fname });

    await userModel.findByIdAndUpdate({ _id: user._id, query: query });
    res.status(200).send({
      success: true,
      message: "Query Reset Successfully",
    });
  } catch (error) {
    console.log(`error in forgot password${error}`);
    res.status(500).send({
      success: false,
      message: "Something went wrongg",
      error,
    });
  }
};
//--------------------------------------------------------------------------------------------------------------
export const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email, "emailll..");
    const oldUser = await userModel.findOne(
      { email: email },
      { _id: 1, password: 1 }
    );
    if (!oldUser) {
      return res.status(400).send({
        status: false,
        message: "User Not Found",
      });
    }
    // const secret = process.env.JWT_SECRET + oldUser .password;
    const secret = process.env.JWT_SECRET;
    const token = JWT.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "5m",
    });
    const link = `http://localhost:8081/api/v1/auth/reset-password/${oldUser._id}/${token}`;
    const textHtml = `Please click <a href=${link}> here </a>to reset Password`;
    var mainOptions = {
      from: "gulshandeep0014@gmail.com",
      to: email,
      subject: "Password Reset",
      text: link,
      html: textHtml,
    };
    transport.sendMail(mainOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).send({
          status: false,
          message: "Error occurred while sending email.",
        });
      } else {
        console.log(info);
        return res.status(200).send({
          status: true,
          message: "Password reset link has been sent to your email.",
        });
      }
    });
    console.log(oldUser);
  } catch (err) {
    return res.status(400).send({
      status: false,
      message: err.message,
    });
  }
};
export const resetPassWordToken = async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const oldUser = await userModel.findOne({ _id: id }, { email: 1 });
  var userEmail;
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  } else {
    userEmail = oldUser.email;
  }
  // const secret = process.env.JWT_SECRET + oldUser .password;
  const secret = process.env.JWT_SECRET;
  try {
    const verify = JWT.verify(token, secret);
    // res.send("Verified")
    res.render('index', { email: userEmail });

    // res.json({ email: verify.email, status: "verified" });
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
};
//----------reset password updated--------
export const resetPassWordUpdate = async (req, res) => {
  console.log("hey ;i am called")
  const { id, token } = req.params;
  const  password  = req.body.password;
console.log(req.body,"awds")
  var userEmail;
  console.log(password, "pasd");
  if (!password) {
    return res.json({ status: "Password is required!!" });
  }
  const oldUser = await userModel.findOne({ _id: id }, { email: 1 });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  } else {
    userEmail = oldUser.email;
  }
  // const secret = process.env.JWT_SECRET + oldUser .password;
  const secret = process.env.JWT_SECRET;
  try {
    const verify = JWT.verify(token, secret);
    console.log("New password:", password);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await userModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );
    res.render("passwordSuccess", { email: verify.email });
 

  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
};
//test controller-----------------------------------------------------------------
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(`error in test,${error}`);
    res.send({ error });
  }
};

//-----------------------------------------------------------------------------query controller
export const queryController = async (req, res) => {
  try {
    const { fname, email, query } = req.body;

    // Validations

    if (!fname) {
      return res.send({ message: "Fname is required" });
    }
    if (!email) {
      return res.send({ message: "Book name is required" });
    }

    if (!query) {
      return res.send({ message: "Query is required" });
    }

    const newQuery = await queryModel.create({
      fname,
      email,
      query,
    });

    res.status(200).send({
      success: true,
      message: "query submitted successfully",
      data: newQuery,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in querying",
      error,
    });
  }
};
//-----------------------------------------------------------issue book api-------------------------------------------------------------------


export const bookController = async (req, res) => {
  try {
    const {
      fname,
      bookname,
      authors,
      publisher,
      publishedDate,
      issuedDate,
      email,
      returnDate,
    } = req.body;

    // Validations

    if (!fname) {
      return res.send({ message: "Fname is required" });
    }
    if (!email) {
      return res.send({ message: "Book name is required" });
    }
    if (!bookname) {
      return res.send({ message: "Book name is required" });
    }
   
    if (!publisher) {
      return res.send({ message: "Publisher is required" });
    }
    if (!issuedDate) {
      return res.send({ message: "Issued date is required" });
    }

    // Check if book is already issued
    const issuedBook = await bookModel.findOne({ bookname });

    if (issuedBook && issuedBook.status !== "Returned") {
      return res.status(200).send({
        success: false,
        message: "Book is already issued; out of stock",
      });
    }
    if (issuedBook && issuedBook.status === "Returned") {
      issuedBook.status = "Returned";
      await issuedBook.save();

      return res.status(200).send({
        success: true,
        message: "Book is available for issuance again",
        data: {
          ...issuedBook.toObject(),
          status: issuedBook.status,
        },
      });
    }

    // Create the book in the database
    const newBook = await bookModel.create({
      fname,
      bookname,
      authors,
      publisher,
      publishedDate,
      issuedDate,
      returnDate,
    });

    res.status(200).send({
      success: true,
      message: "Book issued successfully",
      data: {
        ...newBook.toObject(),
        status: newBook.status,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in book issuance",
      error,
    });
  }
};

//---book list controller
export const bookListController = async (req, res) => {
  try {
    const issues = await bookModel.find({}).sort({ issuedDate: "-1" });

    res.json({
      success: true,
      message: "Books fetched successfully",
      data: issues,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//-update status for books
export const updateStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await bookModel.findByIdAndUpdate(id, { status }, { new: true });
    res.status(200).send({
      success: true,
      message: " Updated successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

export const deleteBookController = async (req, res) => {
  try {
    const bookId = req.params.id;

    // Delete the book by its ID
    await bookModel.findByIdAndDelete(bookId);

    res.json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

export const userbookListController = async (req, res) => {
  try {
    const userName = req.params.fname; // Assuming req.user contains the authenticated user details
    console.log(userName, "uuu");
    const books = await bookModel.find({fname: userName });
    if (!books) {
      res.status(500).send({
        success: false,
        message: "Error while getting books",
      });
    }
    else {
      res.status(200).send({
        success: true,
        message: "Getting data",
        data : books,
    });
  } 
}catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting books",
      error,
    });
  }
};

//-----------------------------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------update profile

export const updateProfileController = async (req, res) => {
  try {
    const { fname, email, lname, bio, address } = req.body;

    const user = await userModel.findOne({ email: email });

    if (!email) {
      return res.status(404).send({
        success: false,
        message: `No task found with title "${email}"`,
      });
    }

    await userModel.findByIdAndUpdate(user._id, { $set: { fname, lname, bio, address } }, { new: true });


    res.status(200).send({
      success: true,
      message: "Updated Successfully",
    });
  } catch (error) {
    console.log(`error in updating : ${error}`);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//--------------------------------------------------------------------------------------------------------------------------

///task api ......for  admin calender ///////////////////////////////////////////////////////////////////////////////////////////////
//adminadd task
export const addTaskController = async (req, res) => {
  try {
    const { title, start, end, priority } = req.body;

    if (!title) {
      return res.send({ message: "Task is required" });
    }
    if (!start) {
      return res.send({ message: "S.D. is required" });
    }

    const newTask = await taskModel.create({
      title,
      start,
      end,
      priority,
    });

    res.status(200).send({
      success: true,
      message: "Task added successfully",
      data: newTask,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error ",
      error,
    });
  }
};
//admin task list
export const taskListController = async (req, res) => {
  try {
    const tasks = await taskModel.find({});

    res.json({
      success: true,
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//admin update task
export const updateTaskController = async (req, res) => {
  try {
    const { title, start, end, priority, description, category } = req.body;

    const task = await taskModel.findOne({ start: start });

    if (!start) {
      return res.status(404).send({
        success: false,
        message: `No task found with title "${start}"`,
      });
    }

    await taskModel.findByIdAndUpdate(task._id, {
      $set: { title, start, end, priority, description, category },
    });

    res.status(200).send({
      success: true,
      message: "Updated Successfully",
    });
  } catch (error) {
    console.log(`error in updating task: ${error}`);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
//admin delete task
export const deleteTaskController = async (req, res) => {
  try {
    const { id } = req.params;

    await taskModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: " Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting ",
      error,
    });
  }
};

//------------------------------------------------------------------------------*****************************************************************

//user tasks api s----------------------------------for usercalender
//addtask
export const addUserTaskController = async (req, res) => {
  try {
    const { title, start, end, priority,email } = req.body;
   
    if (!start) {
      return res.send({ message: "S.D. is required" });
    }

    const newTask = await userTaskModel.create({
      title,
      start,
      end,
      priority,
      email,
    });

    res.status(200).send({
      success: true,
      message: "Task added successfully",
      data: newTask,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error ",
      error,
    });
  }
};
//---usertasklist
export const usertaskListController = async (req, res) => {
  try {
    const tasks = await userTaskModel.find({});

    res.json({
      success: true,
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
//-single user tasks
export const getUserTaskController = async (req, res) => {
  try {
    const userEmail = req.params.email; // Assuming req.user contains the authenticated user details
    console.log(userEmail, "uuu");
    const tasks = await userTaskModel.find({email: userEmail });
    if (!tasks) {
      res.status(500).send({
        success: false,
        message: "Error while getting tasks",
      });
    }
    else {
      res.status(200).send({
        success: true,
        message: "Getting data",
        data : tasks,
    });
  } 
}catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting tasks",
      error,
    });
  }
};

//--userupdate tasks
export const userUpdateTaskController = async (req, res) => {
  try {
    const { title, start, end, priority, description } = req.body;

    const task = await userTaskModel.findOne({ start: start });

    if (!start) {
      return res.status(404).send({
        success: false,
        message: `No task found with title "${start}"`,
      });
    }

    await userTaskModel.findByIdAndUpdate(task._id, {
      $set: { title, start, end, priority, description },
    });

    res.status(200).send({
      success: true,
      message: "Updated Successfully",
    });
  } catch (error) {
    console.log(`error in updating task: ${error}`);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//delete usertask---
export const deleteUserTaskController = async (req, res) => {
  try {
    const { id } = req.params;
    await userTaskModel.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: " Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting ",
      error,
    });
  }
};

//----------------------------------------------------------------------------------------------------------------------------------
export const userDataController = async (req, res) => {
  try {
    const user = await userModel.find({});

    res.json({
      success: true,
      message: "Tasks fetched successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

export const queryListController = async (req, res) => {
  try {
    const user = await queryModel.find({});

    res.json({
      success: true,
      message: "Tasks fetched successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};




export const sendNotificationController = async (req, res) => {
  try {
    const { sender, receiver, message } = req.body;

    // Perform validations
    if (!sender) {
      return res.status(400).send({ message: "Sender is required" });
    }
    if (!receiver) {
      return res.status(400).send({ message: "Receiver is required" });
    }
    if (!message) {
      return res.status(400).send({ message: "Message is required" });
    }

    // Create a new notification
    const newNotification = await notificationModel.create({
      sender,
      receiver,
      message
    });

    res.status(200).send({
      success: true,
      message: "Notification sent successfully",
      data: newNotification,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error sending notification",
      error,
    });
  }
};




export const getNotificationController = async (req, res) => {
  try {
    const userName = req.params.receiver; // Use req.params.receiver instead of req.params.fname
    console.log(userName, "uuu");
    const messages = await notificationModel.find({ receiver: userName });
    res.status(200).json(messages);
  } catch (error) {
    console.log(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Internal server error" });
  }
};




export const sendEmailController = async (req, res) => {
  try {
    const { email, message,query } = req.body;

    // Perform validations
    if (!email) {
      return res.status(400).send({ message: "email is required" });
    }
  
    if (!message) {
      return res.status(400).send({ message: "Message is required" });
    }

    // Create a new notification
    const newEmail = await messageModel.create({
     email,
      query,
      message
    });

    res.status(200).send({
      success: true,
      message: "Email sent successfully",
      data: newEmail,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error sending reply",
      error,
    });
  }
};

export const getReplyController = async (req, res) => {
  try {
    const userEmail = req.params.email; // Assuming req.user contains the authenticated user details
    console.log(userEmail, "uuu");
    const replies = await messageModel.find({email: userEmail });
    if (!replies) {
      res.status(500).send({
        success: false,
        message: "Error while getting tasks",
      });
    }
    else {
      res.status(200).send({
        success: true,
        message: "Getting data",
        data : replies,
    });
  } 
}catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting tasks",
      error,
    });
  }
};


//---------------------------------------------
export const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;
    await userModel.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: " Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting ",
      error,
    });
  }
};
//--------------------------------------------------
