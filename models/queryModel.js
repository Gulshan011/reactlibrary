import mongoose from "mongoose";

const querySchema = new mongoose.Schema({
  fname:{
    type:String,
  },
 email: {
    type: String,
  },
 
        query:{
            type:String,
            required:true
        },

})

export default mongoose.model("query", querySchema);
