import mongoose from "mongoose";

const UserTaskSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  start:{
    type:Date,
  },
  end:{
    type:Date,
  },
  priority:{
    type:String,

  },
  description:{
    type:String,
  },
  
  
});

export default mongoose.model("usertasks",UserTaskSchema);