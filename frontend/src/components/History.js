

import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import Sidebar from '../../src/components/user/Sidebar';
import Table from 'react-bootstrap/Table';
import { useContext } from 'react';
import { AuthContext } from "../context/auth.js";
import { FaFontAwesome } from 'react-icons/fa';

const History = () => {
  const [qrValues, setQrValues] = useState([]);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const storedQrValues = JSON.parse(localStorage.getItem('qrValues')) || [];
    const newValues = storedQrValues.map(item => JSON.parse(item));
    setQrValues(newValues);
    console.log(newValues);
  }, []);

  return (
    <div className='history-container'>
      <Sidebar />
      <br></br>
      {qrValues.length > 0 ? (
        <div className='tablecontainer'>
          <div className="table-responsive">
            <Table striped bordered hover variant="light">
              <thead>
                <tr>
                  <th>QR Codes </th>
                  <th>Quick Description</th>
                </tr>
              </thead>
              <tbody>
                {qrValues.map((qrValue, index) => (
                  <tr key={index}>
                    <td>
                      <QRCode value={JSON.stringify(qrValue)} />
                      <p>Scan QRs for complete info!!!</p>
                    </td>
                    <td>
                      {qrValue.data.fname && <p className='text-center mt-4' style={{fontFamily:"poppins"}} >BookName:-{qrValue.data.bookname}</p>}
                      {qrValue.data.issuedDate.split("T")[0]&& <p  className='text-center mt-4 'style={{fontFamily:"poppins"}}> IssuedDate:- {qrValue.data.issuedDate.split("T")[0]}</p>}
                      {qrValue.data.returnDate&& <p  className='text-center mt-4 'style={{fontFamily:"poppins"}}> ReturnDate:- {qrValue.data.returnDate.split("T")[0]}</p>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      ) : (
        <p>No QR codes available</p>
      )}
    </div>
  );
};

export default History;
