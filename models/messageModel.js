 import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
  email:String,
  message: String,
 
});
export default mongoose.model("Message", messageSchema);