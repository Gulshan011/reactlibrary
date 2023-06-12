// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import * as FaIcons from 'react-icons/fa';
// import { AuthContext } from '../../context/auth';

// const NotificationComponent = () => {
//   const [notifications, setNotifications] = useState([]);
//   const { auth } = useContext(AuthContext);
//   const receiver = auth.user && auth.user.fname;
 
//   const fetchNotifications = async () => {
//     try {
//       const response = await axios.get(`http://localhost:8081/api/v1/auth/notification/${receiver}`);
//       console.log(response.data); // Use response.data to access the response payload
//       setNotifications(response.data); // Update the notifications state with the response data
//     } catch (error) {
//       console.log(error);
//     }
//   };
  

//     useEffect(() => {
//       fetchNotifications();
//     }, []);

//   const handleBellClick = () => {
//     if (notifications.length === 0) {
//       Swal.fire({
//         title: 'No notifications',
//         text: 'There are no new notifications',
//         icon: 'info',
//         timer: 2000,
//         showConfirmButton: false,
//       });
//     } else {
//       const messageList = notifications.map((notification) => notification.message);
//       const messageListHTML = messageList.length > 0 ? `<ul>${messageList.map((message) => `<li>${message}</li>`).join('')}</ul>` : '';
//       Swal.fire({
//         position: 'top-end',
//         title: 'Notifications from Librarian',
//         html: messageListHTML,
//         icon: 'info',
       
//         showCloseButton: true,
//       });
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleBellClick} className="bell-icon">
//         <FaIcons.FaBell />
//         {notifications.length > 0 && <span className="notification-count">{notifications.length}</span>}
//       </button>
//     </div>
//   );
// };

// export default NotificationComponent;





// // const { value: file } = await Swal.fire({
// //   title: 'Select image',
// //   input: 'file',
// //   inputAttributes: {
// //     'accept': 'image/*',
// //     'aria-label': 'Upload your profile picture'
// //   }
// // })

// // if (file) {
// //   const reader = new FileReader()
// //   reader.onload = (e) => {
// //     Swal.fire({
// //       title: 'Your uploaded picture',
// //       imageUrl: e.target.result,
// //       imageAlt: 'The uploaded picture'
// //     })
// //   }
// //   reader.readAsDataURL(file)
// // }

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
         
          <td>${notification.message}</td>
        </tr>
      `);
      const tableHTML = `
        <table>
          <thead>
            <tr>
              <th>Message</th>
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
