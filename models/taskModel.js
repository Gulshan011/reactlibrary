import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
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

  }
});

export default mongoose.model("tasks",TaskSchema);