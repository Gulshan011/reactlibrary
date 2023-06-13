
import React, { useEffect, useState, useContext } from 'react';

import Swal from 'sweetalert2';
import { FaInbox } from 'react-icons/fa';
import { AuthContext } from '../../context/auth';
import './EmailComponent.css';

const EmailComponent = () => {
  const [notifications, setNotifications] = useState([]);
  const [showPopup, setShowPopup] = useState(true);
  const { auth } = useContext(AuthContext);
  const email = auth.user && auth.user.email;

  useEffect(() => {
    fetch(`http://localhost:8081/api/v1/auth/reply/${email}`)
      .then((res) => res.json())
      .then((data) => setNotifications(data.data.slice(0, 5)))
      .catch((error) => console.log(error));
  }, [email]);

  const handleBellClick = () => {
    setShowPopup(false);

    if (notifications.length === 0) {
      Swal.fire({
        title: 'No notifications',
        text: 'There are no new notifications',
        icon: 'info',
        timer: 2000,
        showConfirmButton: false,
        showCloseButton: true,
      });
    } else if (Array.isArray(notifications)) {
      const tableRows = notifications.map((notification) => `
        <tr>
          <td>${notification.query}</td>
          <td>${notification.message}</td>
        </tr>
      `);
      const tableHTML = `
        <table>
          <thead>
            <tr>
              <th>Query</th>
              <th>Replies</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows.join('')}
          </tbody>
        </table>
      `;

      Swal.fire({
        title: 'Replies',
        position: 'top-end',
        html: tableHTML,
        icon: 'info',
        showCloseButton: true,
        showConfirmButton: true,
      }).then(() => {
        localStorage.setItem('inboxChecked', 'true');
      });
    }
  };

  useEffect(() => {
    let popupInterval;

    if (showPopup && !localStorage.getItem('inboxChecked') && notifications.length !== 0) {
      popupInterval = setInterval(() => {
        Swal.fire({
          position: 'top-end',
          title: 'Check Inbox',
          width: 400,
          html: 'You have new messages in your inbox',
          icon: 'info',
          showCloseButton: true,
          customClass: {
            heightAuto: false,
            popup: 'custom-popup',
          },
        });
      }, 5000); // 5 seconds interval
    }

    return () => {
      clearInterval(popupInterval); // Clean up the interval when component unmounts
    };
  }, [showPopup, notifications]);

  return (
    <div>
      <button onClick={handleBellClick} className="bell-icon">
        <FaInbox />
        {notifications.length > 0 && <span className="notification-count">{notifications.length}</span>}
      </button>
    </div>
  );
};

export default EmailComponent;

