
import axios from 'axios';
import React, { useState } from "react";
import * as IoIcons from 'react-icons/io';
import"./style.css"
import Swal from "sweetalert2";  
import { toast } from "react-toastify";
import QRCode from 'qrcode.react';
import { useNavigate, NavLink } from "react-router-dom";
import { useContext, AuthContext } from "../../../context/auth";

const Modal = ({ show, item, onClose }) => {
  const [qrValue, setQrValue] = useState('');
  const { auth, setAuth } = useContext(AuthContext);
  const issuedDate = new Date(); 
  const returnDate = new Date(issuedDate);
  const navigate = useNavigate();
  returnDate.setDate(returnDate.getDate() + 14);

  const issueBook = async () => {
    try {
      const res = await axios.post(`http://localhost:8081/api/v1/auth/issuebook`, {
        fname: auth.user && auth.user.fname,
        email: auth.user && auth.user.email,
        bookname: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
        publisher: item.volumeInfo.publisher,
        publisheddate: item.volumeInfo.publishedDate,
        issuedDate: new Date().toJSON(),
        returnDate: returnDate.toJSON(),
        status: item.status,
      });
console.log(res,"rr")
      if (res && res.data.success) {
        setQrValue(JSON.stringify(res.data));
        const stringifiedData = JSON.stringify(res.data);
        const parsedData = JSON.parse(stringifiedData);
        setQrValue(JSON.stringify(res.data));
        const existingQrValues = JSON.parse(localStorage.getItem('qrValues')) || [];
        existingQrValues.push(JSON.stringify(res.data));
        localStorage.setItem('qrValues', JSON.stringify(existingQrValues));
        
          Swal.fire({
            title: "Success!",
            text: res.data.message,
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
         });
        } else {
          toast.error(res.data.message);
        }
     
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
 
  const handleMouseOver = (event) => {
    event.target.style.height = "200px";
    event.target.style.width = "200px";
  };
  
  const handleMouseOut = (event) => {
    event.target.style.height = "128px";
    event.target.style.width = "128px";
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
              <div>
                <a href={item.volumeInfo.previewLink}><button>More</button></a>
                <button onClick={issueBook}>Issue</button>
                <p style={{Color:"blue"}}>{item.status}</p>
              </div> 
             
              {item.status !== "Returned" && qrValue && (
                <div
                  className="qr-code"
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  <QRCode value={qrValue} />
                </div>
              )}
            </div>
          </div>
          
          <h4 className="description qr-description">{item.volumeInfo.description}</h4>
        </div>
      </div>
    </>
  );
};

export default Modal;
