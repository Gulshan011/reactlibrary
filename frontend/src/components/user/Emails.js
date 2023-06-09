import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaInbox } from 'react-icons/fa';
import { AuthContext } from "../../context/auth";
 // Import the CSS file for styling

const EmailComponent = () => {
  const [notifications, setNotifications] = useState([]);
  const { auth } = useContext(AuthContext);
  const email = auth.user && auth.user.email;

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/v1/auth/reply/${email}`);
        setNotifications(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReplies();
  }, [email]);

  const handleBellClick = () => {
    if (notifications.length === 0) {
      Swal.fire({
        title: 'No notifications',
        text: 'There are no new notifications',
        icon: 'info',
        timer: 2000,
        showConfirmButton: false
      });
    } else {
      const messages = notifications.map((notification) => notification.message).join('\n');
      Swal.fire({
        title: 'Notifications',
        text: messages,
        icon: 'info',
        showConfirmButton: true
      });
    }
  };

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

