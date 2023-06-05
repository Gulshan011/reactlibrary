import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        
      },
      lname: {
        type: String,
        required: true,
      },
      regnumber: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        required: true,
      },
      dept: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        //unique: true,
      },
    
      password: {
        type: String,
        required: true,
      },
      gender:{
        type:String,
        required:true,
      },
      photo:{
        type:Buffer,
        contentType:String,
      },
      answer:{
        type:String,
       
      },
      address:{
        type:String,
      },
      bio:{
        type:String,
      },
  
    
    },
{timestamps:true},
)
export default mongoose.model("users",userSchema);
