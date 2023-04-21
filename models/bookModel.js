import mongoose from 'mongoose';
const BookSchema=new mongoose.Schema({
    bookname: {
        type: String,
        
      },
    
     publisher: {
        type: String,
        required: true,
      },
      
    
    })
 export default mongoose.model("books",BookSchema);