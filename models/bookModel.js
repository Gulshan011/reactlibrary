import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  fname:{
    type:String,
  },
  bookname: {
    type: String,
  },
  authors: {
    type: [String], // specify that authors is an array of strings
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  publishedDate: {
    type: String,
  },
  issuedDate: {
    type: Date,
    required: true,
  },
  returnDate:{
    type:Date
  },
  status:{
    type:String,
    default:"IssuedNotCollected",
    enum:["IssuedNotCollected","issued","Collected","Returned","Reissued"]
  }
});

export default mongoose.model("books", BookSchema);
