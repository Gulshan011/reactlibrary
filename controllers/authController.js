import userModel from "../models/userModel.js";
import { comparePassword, hashpassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import { title } from "process";
import bookModel from "../models/bookModel.js";
import queryModel from "../models/queryModel.js";
import taskModel from "../models/taskModel.js";
import userTaskModel from "../models/userTaskModel.js";
import fs from 'fs'


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
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await userModel.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: newPassword });
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

// export const bookController = async (req, res) => {
//   try {
//     const {
//       fname,
//       bookname,
//       authors,
//       publisher,
//       publishedDate,
//       issuedDate,
//       email,
//       returnDate,
//     } = req.body;

//     // Validations

//     if (!fname) {
//       return res.send({ message: "Fname is required" });
//     }
//     if (!email) {
//       return res.send({ message: "Book name is required" });
//     }
//     if (!bookname) {
//       return res.send({ message: "Book name is required" });
//     }
//     if (!authors) {
//       return res.send({ message: "Authors is required" });
//     }
//     if (!publisher) {
//       return res.send({ message: "Publisher is required" });
//     }
//     if (!issuedDate) {
//       return res.send({ message: "Issued date is required" });
//     }

//     // Check if book is already issued
//     const issuedBook = await bookModel.findOne({ bookname });
//     if (issuedBook) {
//       return res.status(200).send({
//         success: false,
//         message: "Book is already issued; out of stock",
//       });
//     }

//     // Create the book in the database
//     const newBook = await bookModel.create({
//       fname,
//       bookname,
//       authors,
//       publisher,
//       publishedDate,
//       issuedDate,
//       returnDate,
//     });

//     res.status(200).send({
//       success: true,
//       message: "Book issued successfully",
//       data: {
//         ...newBook.toObject(),
//         status: newBook.status, // Include the status field in the response
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error in book issuance",
//       error,
//     });
//   }
// };
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
    if (!authors) {
      return res.send({ message: "Authors is required" });
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
  try{
    const { id } = req.params;
    const{status}=req.body
    await bookModel.findByIdAndUpdate(id,{status},{new:true});
    res.status(200).send({
      success: true,
      message: " Updated successfully",
    });
      
  }catch(error){
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
}

export const deleteBookController=async(req,res)=>{
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

//-----------------------------------------------------------------------------------------------------------------------







//-------------------------------------------------------------------------------update profile 



export const updateProfileController = async (req, res) => {
  try {
    const { fname,email, lname, bio, address} = req.body;

    const user = await userModel.findOne({ email:email});

    if (!email) {
      return res.status(404).send({
        success: false,
        message: `No task found with title "${email}"`,
      });
    }

    await userModel.findByIdAndUpdate(user._id, {
      $set: {  fname, lname, bio, address},
    });

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
    const { title, start, end, priority, description,category } = req.body;

    const task = await taskModel.findOne({ start: start });

    if (!start) {
      return res.status(404).send({
        success: false,
        message: `No task found with title "${start}"`,
      });
    }

    await taskModel.findByIdAndUpdate(task._id, {
      $set: { title, start, end, priority, description,category },
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
    const { title, start, end, priority } = req.body;

  
    if (!start) {
      return res.send({ message: "S.D. is required" });
    }

    const newTask = await userTaskModel.create({
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
    const userId = req.user._id; // Assuming req.user contains the authenticated user details
    
    const tasks = await userTaskModel.find({ user: userId }).populate(tasks);
    
    res.json(tasks);
  } catch (error) {
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