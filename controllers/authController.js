import userModel from "../models/userModel.js";
import { comparePassword, hashpassword } from '../helpers/authHelper.js';
import JWT from "jsonwebtoken"
import { title } from "process";
import bookModel from "../models/bookModel.js";
export  const registerController = async (req, res) => {
    //register
    try {
        const{fname,lname,email,password,regnumber,role,dept,gender,answer} = req.body;
        //validations
        if(!fname){
            return res.send({message :"FName is required"});
        }
        if(!lname){
            return res.send({message :"LName is required"});
        }
        if(!email){
            return res.send({message :'email is required'});
        }
        if(!password){
            return res.send({message :'password is required'});
        }
        if(!regnumber){
            return res.send({message :' required'});
        }
        if(!gender){
            return res.send({message :"Gender is required"});
        }
        if(!role){
            return res.send({message :'required'});
        }
        if(!dept){
            return res.send({message :'dept is required'});
        }
        if(!answer){
            return res.send({message :'answer is required'});
        }
       //check existing user
       const existinguser = await userModel.findOne({email})
       //existing user
       if(existinguser){
        return res.status(200).send({
            success:false,
            message:'Already register please login'
        })
       }
       //register user
       const  hashedpassword = await hashpassword(password);
       //save
       const user = await new userModel({fname,lname,email,regnumber,role,gender,password:hashedpassword,dept,answer}).save()
       res.status(201).send({
        success:true,
        message:'User register successfully',
        user,
       });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Registeration",
            error
        })
    }
};


// login
export const loginController = async( req,res) =>{
    try{
        const {email,password}=req.body
        //validations
        if(!email||!password){
            return res.status(404).send({
                success:false,
                message:'Invalid email or password'
            })
        }
        //check user
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Email is not register'
            })
        }
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:'invalid passwords'
            })
        }
        //token
        const token = await JWT.sign({_id:user._id }, process.env.JWT_SECRET
            ,{expiresIn: '7days'});
             res.status(200).send({
                success:true,
                message:'login successfully',
                user:{
                    fname:user.fname,
                    lname:user.lname,
                    email:user.email,
                    regnumber:user.regnumber,
                    dept:user.dept,
                    role: user.role,
                    gender:user.gender,
                    answer:user.answer,
                    query:user.query,
                },token,
            });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in login',
            error
        })
    }
};
//forgotPasswordController
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
//test controller
export const testController = (req,res) =>{
    try {
        res.send("Protected Routes");
      } catch (error) {
        console.log(`error in test,${error}`);
        res.send({ error });
      }
    };
// export const bookController=(req,res)=>{
//   if (!title) {
//     return res.status(404).send({
//       success: false,
//       message: 'Invalid entries'
//     });
//   } else {
//     return res.status(200).send({
//       success: true,
//       message: 'Issued'
//     });
//   }
// };

//query 

 export const queryControllers =  async (req, res) => {
 try {
  const { query ,fname } = req.body;
     
  const user =  userModel.findOne({fname : fname});

  await userModel.findByIdAndUpdate({ _id: user._id, query: query });
  res.status(200).send({
    success: true,
    message: "Query Reset Successfully",
  });
 } 
 catch (error) {
  console.log(`error in forgot password${error}`);
  res.status(500).send({
    success: false,
    message: "Something went wrongg",
    error,
  });
 }
 }
 export const queryController = async (req, res) => {
  try {
    const { query, fname } = req.body;

    // Find the user by fname
    const user = await userModel.findOne({ fname });

    // If user does not exist, throw an error
    if (!user) {
      throw new Error('User not found');
    }

    // Update the user's query field with the new query data
    await userModel.findByIdAndUpdate({ _id: user._id }, {fname:fname},{ query });

    // Send a success response
    res.status(200).send({
      success: true,
      message: 'Query reset successfully',
      user,
    });
  } catch (error) {
    // Log the error and send an error response
    console.log(`Error resetting query: ${error}`);
    res.status(500).send({
      success: false,
      message: 'Something went wrong',
      error,
    });
  }
};


 
//  userModel.findOne({fname: fname}, function (err,res){
//   if (err){
//     return res.status(500).send(err)
//   }

//   if (!doc){
//     console.log(req.body + " not found!")
//     var newdoc = new userModel(req.body);
//     newdoc.save(function(err){
//         if(err) return res.status(500).send(err)
//         console.log(newdoc , " created as ");
//         return res.status(200).send({_status : true , data: newdoc})
//     })

//     return res.status(200).send('blal')
// } else {
//     console.log(req.body.fulltext + " found!")
//     for (var id in req.body ){
//         doc[id]= req.body[id];
//     }
//     doc.save( function(err){
//         if(err) return res.status(500).send(err)
//         return res.status(200).send({_id: doc._id, alias: doc.alias})
//     })

  
//  }
  
        // // validations
        // console.log(user);
        // if (!query) {
        //   return res.status(404).send({
        //     success: false,
        //     message: 'Invalid entries',
        
        //   });
        // } else {
          
         
        //   return res.status(200).send({
        //     success: true,
        //     message: 'Query received',
        //     data : user
        //   });
        // }


        // export const queryController = async (req, res) => {
        //   try {
        //     const { query, fname } = req.body;
        //     const user = await userModel.findOne({ fname: fname });
            
        //     if (!user) {
        //       throw new Error("User not found");
        //     }
        
        //     const newUser = await userModel.create({ _id: user._id, query: query });
            
        //     if (!newUser) {
        //       throw new Error("Error creating user");
        //     }
        
        //     res.status(200).send({
        //       success: true,
        //       message: "Query Reset Successfully",
        //       user: newUser,
        //     });
        //   } catch (error) {
        //     console.log(`error in query reset ${error}`);
        //     res.status(500).send({
        //       success: false,
        //       message: "Something went wrong",
        //       error,
        //     });
        //   }
        // };




  // --------------------------------------------------------------------------------------***********************************************************************************************
      //   export  const bookController = async (req, res) => {
      //     //register
      //     try {
      //         const{fname,bookname,authors,publisher,publishedDate,issuedDate} = req.body;
      //         //validations
      //         if(!fname){
      //             return res.send({message :"FName is required"});
      //         }
      //         if(!bookname){
      //             return res.send({message :"bOOKNAME is required"});
      //         }
      //         if(!authors){
      //             return res.send({message :'authors is required'});
      //         }
      //         if(!publisher){
      //             return res.send({message :'publisher is required'});
      //         }
      //         // if(!publishedDate){
      //         //     return res.send({message :' pd required'});
      //         // }
      //         if(!issuedDate){
      //             return res.send({message :"issuedDate is required"});
      //         }
  
      //        //check existing user
      //        const  issuedbook = await bookModel.findOne({bookname})
      //        //existing user
      //        if(issuedbook){
      //         return res.status(200).send({
      //             success:false,
      //             message:'Already issued;out of stock'
      //         })
      //        }
          
      //     } catch (error) {
      //         console.log(error)
      //         res.status(500).send({
      //             success:false,
      //             message:"Error in Registeration",
      //             error
      //         })
      //     }
      // };

      export const bookController = async (req, res) => {
        try {
            const { fname, bookname, authors, publisher, publishedDate, issuedDate,email } = req.body;
    
            // Validations

           if(!fname){
            return res.send({ message: "Fname is required" });
           } 
           if(!email){
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
            if (issuedBook) {
                return res.status(200).send({
                    success: false,
                    message: "Book is already issued; out of stock",
                    
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
            });
    
            res.status(200).send({
                success: true,
                message: "Book issued successfully",
                data: newBook,
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
    