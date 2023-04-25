// import axios from 'axios';
// import React, { useState } from "react";
// import * as IoIcons from 'react-icons/io';
// import { toast } from "react-toastify";
// import QRCode from 'qrcode.react';
// import {useContext,AuthContext}from "../../context/auth.js";
// const Modal=({show,item,onClose})=>{
    
//     const [qrValue, setQrValue] = useState('');

//     const{auth,setAuth}=useContext(AuthContext);
//     const issueBook=async()=>{
//        try{
//      const res=await axios.post(`http://localhost:8081/api/v1/auth/issuebook`, {fname: auth.user && auth.user.fname, email:auth.user && auth.user.fname,bookname:item.volumeInfo.title ,authors:item.volumeInfo.authors,publisher:item.volumeInfo.publisher,publisheddate:item.volumeInfo.publishedDate,issuedDate:new Date().toJSON()});
    
//      if (res && res.data.success) {
//         toast.success("Issued book");
//         setQrValue(JSON.stringify(res.data));
//         <QRCode value={qrValue} /> 
//       } else {
//         toast.error("not available");
//       }
//     }catch(error){
//         console.log(error);
//         toast.error("Something went wrong");
//     }
// };

    
//     if(!show)
//     {
//         return null;
//     }
    
//     let thumbnail=item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
//     return(
//         <>
//             <div className="overlay">
//                 <div className="overlay-inner">
//                     <button className="close" onClick={onClose}><IoIcons.IoIosClose /></button>
//                     <div className="inner-box">
//                         <img src={thumbnail} alt="" />
//                         <div className="info">
//                             <h1>{item.volumeInfo.title}</h1>
//                             <h3>{item.volumeInfo.authors}</h3>
//                             <h4>{item.volumeInfo.publisher}<span>{item.volumeInfo.publishedDate}</span></h4>
//                             <a href={item.volumeInfo.previewLink}><button>More</button></a>
//                              <br></br>
//                              <br></br>    
//                             <button onClick={(issueBook)}>Issue</button>
//                             <br></br>
//                             <br></br>
                      

//                              </div>
//                              </div>
//                              <h4 className="description">{item.volumeInfo.description}</h4>
//                          </div>
//                      </div>
//                  </>
//              )
//          }
         
//  export default Modal;




// //  const issueBook = async () => {
// //     try {
// //       const res = await axios.post(`http://localhost:8081/api/v1/auth/issuebook`, {
// //         fname: auth.user && auth.user.fname,
// //         email: auth.user && auth.user.fname,
// //         bookname: item.volumeInfo.title,
// //         authors: item.volumeInfo.authors,
// //         publisher: item.volumeInfo.publisher,
// //         publisheddate: item.volumeInfo.publishedDate,
// //         issuedDate: new Date().toJSON()
// //       });
  
// //       if (res && res.data.success) {
// //         setQrValue(JSON.stringify(res.data)); // set qrValue to the data stored in res
// //         toast.success("Issued book");
// //       } else {
// //         toast.error("not available");
// //       }
// //     } catch (error) {
// //       console.log(error);
// //       toast.error("Something went wrong");
// //     }
// //   };
  
// //<QRCode value={qrValue} />



// {qrValue && (
//     <div className="qr-code">
//       <QRCode value={qrValue} />
//     </div>
//   )}
  



// //  const qrcode = require('qrcode');

// // const bookDetails = {
// //   title: 'The Great Gatsby',
// //   author: 'F. Scott Fitzgerald',
// //   publisher: 'Scribner',
// //   publishedDate: '1925-04-10'
// // };

// // const qrData = JSON.stringify(bookDetails);

// // const baseUrl = 'https://example.com/qr-code';

// // qrcode.toDataURL(qrData, (err, url) => {
// //   if (err) {
// //     console.error(err);
// //   } else {
// //     const qrUrl = `${baseUrl}?data=${encodeURIComponent(qrData)}`;
// //     console.log(qrUrl);
// //   }
// // });
import axios from 'axios';
import React, { useState } from "react";
import * as IoIcons from 'react-icons/io';
import { toast } from "react-toastify";
import QRCode from 'qrcode.react';
import { useContext, AuthContext } from "../../context/auth.js";

const Modal = ({ show, item, onClose }) => {

  const [qrValue, setQrValue] = useState('');
  const { auth, setAuth } = useContext(AuthContext);

  const issueBook = async () => {
    try {
      const res = await axios.post(`http://localhost:8081/api/v1/auth/issuebook`, {
        fname: auth.user && auth.user.fname,
        email: auth.user && auth.user.fname,
        bookname: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
        publisher: item.volumeInfo.publisher,
        publisheddate: item.volumeInfo.publishedDate,
        issuedDate: new Date().toJSON()
      });

      if (res && res.data.success) {
        // // setQrValue(JSON.stringify(res.data));
        // setQrValue(JSON.stringify(res.data)); // set the qrValue state to the response data
        //   localStorage.setItem('qrValue', JSON.stringify(res.data)); // store the qrValue in the localStorage

        setQrValue(JSON.stringify(res.data)); // set the qrValue state to the response data
  
        // retrieve the existing qrValues from the localStorage or initialize an empty array
        const existingQrValues = JSON.parse(localStorage.getItem('qrValues')) || [];
        // add the new qrValue to the array
        existingQrValues.push(res.data);
        // store the updated array in the localStorage
        localStorage.setItem('qrValues', JSON.stringify(existingQrValues));
        toast.success("Issued book");
      } else {
        toast.error("not available");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  if (!show) {
    return null;
  }

  let thumbnail = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
  return (
    <>
      <div className="overlay">
        <div className="overlay-inner">
          <button className="close" onClick={onClose}><IoIcons.IoIosClose /></button>
          <div className="inner-box">
            <img src={thumbnail} alt="" />
            <div className="info">
              <h1>{item.volumeInfo.title}</h1>
              <h3>{item.volumeInfo.authors}</h3>
              <h4>{item.volumeInfo.publisher}<span>{item.volumeInfo.publishedDate}</span></h4>
             <div><a href={item.volumeInfo.previewLink}><button>More</button></a>
            
            
              <button onClick={issueBook}>Issue</button></div> 
             <br></br>
              {qrValue && (
                <div className="qr-code">
                  <QRCode value={qrValue} />
                </div>
              )}
            </div>
          </div>
          <h4 className="description">{item.volumeInfo.description}</h4>
        </div>
      </div>
    </>
  )
}

export default Modal;

// const issueBook = async () => {
//     try {
//       const res = await axios.post('http://localhost:8081/api/v1/auth/issuebook', {
//         fname: auth.user && auth.user.fname,
//         email: auth.user && auth.user.fname,
//         bookname: item.volumeInfo.title,
//         authors: item.volumeInfo.authors,
//         publisher: item.volumeInfo.publisher,
//         publisheddate: item.volumeInfo.publishedDate,
//         issuedDate: new Date().toJSON(),
//       });
  
//       if (res && res.data.success) {
//         toast.success('Issued book');
//         setQrValue(res.data); // set the qrValue state to the response data
//         localStorage.setItem('qrValue', JSON.stringify(res.data)); // store the qrValue in the localStorage
//       } else {
//         toast.error('not available');
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error('Something went wrong');
//     }
//   };
  
// const issueBook = async () => {
//     try {
//       const res = await axios.post('http://localhost:8081/api/v1/auth/issuebook', {
//         fname: auth.user && auth.user.fname,
//         email: auth.user && auth.user.fname,
//         bookname: item.volumeInfo.title,
//         authors: item.volumeInfo.authors,
//         publisher: item.volumeInfo.publisher,
//         publisheddate: item.volumeInfo.publishedDate,
//         issuedDate: new Date().toJSON(),
//       });
  
//       if (res && res.data.success) {
//         toast.success('Issued book');
//         setQrValue(res.data); // set the qrValue state to the response data
  
//         // retrieve the existing qrValues from the localStorage or initialize an empty array
//         const existingQrValues = JSON.parse(localStorage.getItem('qrValues')) || [];
//         // add the new qrValue to the array
//         existingQrValues.push(res.data);
//         // store the updated array in the localStorage
//         localStorage.setItem('qrValues', JSON.stringify(existingQrValues));
//       } else {
//         toast.error('not available');
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error('Something went wrong');
//     }
//   };
  