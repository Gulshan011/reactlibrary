

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import * as FaIcons from 'react-icons/fa';
import { AuthContext } from '../../context/auth';

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);
  const { auth } = useContext(AuthContext);
  const receiver = auth.user && auth.user.fname;

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/v1/auth/notification/${receiver}`);
      console.log(response.data); // Use response.data to access the response payload
      setNotifications(response.data); // Update the notifications state with the response data
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleBellClick = () => {
    if (notifications.length === 0) {
      Swal.fire({
        title: 'No notifications',
        text: 'There are no new notifications',
        icon: 'info',
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
  const tableRows = notifications.map((notification) => `
  <tr>
    <td>${notification.sender}</td>
    <td>${notification.message}</td>
  </tr>
`);

const tableHTML = `
  <table style="border-collapse: collapse; width: 100%;">
    <thead>
      <tr>
        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px; width:100px; height: 100px;">Sent By</th>
        <th style="border: 1px solid #dddddd; text-align: left; padding: 8px;">Message</th>
        
      </tr>
    </thead>
    <tbody>
      ${tableRows.join('')}
    </tbody>
  </table>
`;


      Swal.fire({
        position: 'top-end',
        title: 'Notifications from Librarian',
        html: tableHTML,
        icon: 'info',
        showCloseButton: true,
      });
    }
  };

  return (
    <div>
      <button onClick={handleBellClick} className="bell-icon">
        <FaIcons.FaBell />
        {notifications.length > 0 && <span className="notification-count">{notifications.length}</span>}
      </button>
    </div>
  );
};

export default NotificationComponent;
