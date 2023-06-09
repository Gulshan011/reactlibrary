
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import * as FaIcons from 'react-icons/fa';
const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/v1/auth/notification/:receiver');
      setNotifications(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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
    <FaIcons.FaBell/>
    {notifications.length > 0 && <span className="notification-count">{notifications.length}</span>}
  </button>
    </div>
  );
};

export default NotificationComponent;
