
// import React, { useEffect, useState } from 'react';
// import QRCode from 'qrcode.react';
// import Sidebar from '../user/Sidebar'

// const History = () => {
//   const [qrValues, setQrValue] = useState([]);

//   useEffect(() => {
//     const storedQrValues = JSON.parse(localStorage.getItem('qrValues')) || [];
//     setQrValue(storedQrValues);
//   }, []);

//   return (
//     <div>
//     <Sidebar/>
//       {qrValues.length > 0 ? (
//         qrValues.map((qrValue, index) => (
//           <QRCode key={index} value={qrValue} />
//         ))
//       ) : (
//         <p>No QR codes available</p>
//       )}
//     </div>
//   );
// };

// export default History;
import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import Sidebar from '../user/Sidebar'
import Table from 'react-bootstrap/Table';
import{useContext,AuthContext}from "../context/auth.js";

const History = () => {
  const [qrValues, setQrValue] = useState([]);
  const{auth,setAuth}=useContext(AuthContext);
  console.log(qrValues);

  useEffect(() => {
    const storedQrValues = JSON.parse(localStorage.getItem('qrValues')) || [];
    const newValues = storedQrValues.map(item => JSON.parse(item))
    console.log(newValues,"newValues...")
    setQrValue(storedQrValues);
  }, []);

  return (
    <div>
    <Sidebar/>
    <br></br>
      {qrValues.length > 0 ? (
        <div className='tablecontainer'>
        <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            
            <th>Qr Codes</th>
            <th>Quick description</th>
            
          </tr>
        </thead>
          <tbody>
            {qrValues.map((qrValue, index) => (
              <tr key={index}>
                <td>
                  <QRCode value={qrValue} />
                </td>
                <td>{}</td>
              </tr>
            ))}
            </tbody>
            
            
             
       
         
        </Table>
        </div>
      ) : (
        <p>No QR codes available</p>
      )}
    </div>
  );
};

export default History;

