import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        
      },
      lname: {
        type: String,
        //required: true,
      },
      regnumber: {
        type: String,
        //required: true,
      },
      role: {
        type: String,
        //required: true,
      },
      dept: {
        type: String,
        //required: true,
      },
      email: {
        type: String,
        //required: true,
        //unique: true,
      },
    
      password: {
        type: String,
        //required: true,
      },
      gender:{
        type:String,
        //required:true,
      },
      answer:{
        type:String,
        //required:true,
      },
      query:{
        type:String,
       
      }
    
    },
{timestamps:true},
)
export default mongoose.model("users",userSchema);
// const BookSchema=new mongoose.Schema({
//   title: {
//       type: String,
      
//     },
//    author: {
//       type: String,
//       //required: true,
//     },
//    publisher: {
//       type: String,
//       //required: true,
//     },
    
  
//   })
//    mongoose.model("books",BookSchema);