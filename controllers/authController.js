import userModel from "../models/userModel.js";
import { comparePassword, hashpassword } from '../helpers/authHelper.js';
import JWT from "jsonwebtoken"
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