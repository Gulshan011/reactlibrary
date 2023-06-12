 import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
  email:String,
  message: String,
  query:String,
 
});
export default mongoose.model("Message", messageSchema);