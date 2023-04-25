
import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import Sidebar from '../user/Sidebar'

const History = () => {
  const [qrValues, setQrValues] = useState([]);

  useEffect(() => {
    const storedQrValues = JSON.parse(localStorage.getItem('qrValues')) || [];
    setQrValues(storedQrValues);
  }, []);

  return (
    <div>
    <Sidebar/>
      {qrValues.length > 0 ? (
        qrValues.map((qrValue, index) => (
          <QRCode key={index} value={qrValue} />
        ))
      ) : (
        <p>No QR codes available</p>
      )}
    </div>
  );
};

export default History;
