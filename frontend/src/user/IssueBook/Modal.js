import axios from 'axios';
import React, { useState } from "react";
import * as IoIcons from 'react-icons/io';
import { toast } from "react-toastify";

const Modal=({show,item,onClose})=>{
    const [message, setMessage] = useState("");
    const issueBook=async()=>{
       try{
     const res=await axios.post(`http://localhost:8081/api/v1/auth/issuebook`, { bookname: item.volumeInfo.title ,authors:item.volumeInfo.authors,publisher:item.volumeInfo.publisher,publisheddate:item.volumeInfo.publishedDate});
     if (res && res.data.success) {
        toast.success("Issued book");
        

      } else {
        toast.error("ERROR");
      }
    }catch(error){
        console.log(error);
        toast.error("Something went wrong");
    }
};
// const issueBook = () => {
   
//     axios.post("https://mongodb+srv://gulshandeep0014:gulshan@cluster0.nhjp0ag.mongodb.net/?retryWrites=true&w=majority", {
//          bookname: item.volumeInfo.title ,authors:item.volumeInfo.authors,publisher:item.volumeInfo.publisher,publisheddate:item.volumeInfo.publishedDate
//       })
//       .then((res) => {
//         setMessage(res.data.message);
//         toast.success("issued")
//       })
//       .catch((err) => {
//         console.log(err);
//         toast.error("error")
//       });
//   };
    
    
    if(!show)
    {
        return null;
    }
    
    let thumbnail=item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
    return(
        <>
            <div className="overlay">
                <div className="overlay-inner">
                    <button className="close" onClick={onClose}><IoIcons.IoIosClose /></button>
                    <div className="inner-box">
                        <img src={thumbnail} alt="" />
                        <div className="info">
                            <h1>{item.volumeInfo.title}</h1>
                            <h3>{item.volumeInfo.authors}</h3>
                            <h4>{item.volumeInfo.publisher}<span>{item.volumeInfo.publishedDate}</span></h4><br/>
                            <a href={item.volumeInfo.previewLink}><button>More</button></a>
                             <br></br>
                             <br></br>    
                            <button onClick={(issueBook)}>Issue</button>

                             </div>
                             </div>
                             <h4 className="description">{item.volumeInfo.description}</h4>
                         </div>
                     </div>
                 </>
             )
         }
         
 export default Modal;
