// import React from 'react';
// import * as FaIcons from 'react-icons/fa';
// import * as AiIcons from 'react-icons/ai';
// import * as IoIcons from 'react-icons/io';
// import { useContext, AuthContext } from "../../context/auth";
// import { toast } from "react-toastify"; 
// import { useNavigate } from 'react-router-dom';

// const LogoutButton = () => {
//   const navigate = useNavigate();
//   const { auth, setAuth } = useContext(AuthContext);
  
//   const handleLogOut = () => {
//     setAuth({
//       ...auth,
//       user: null,
//       token: "",
//     });
//     localStorage.removeItem("auth")
//     navigate('/home')
//     toast.success(`Logged out ${auth.user && auth.user.fname}`)
//   };
//   const welcome = ({ welcomeText }) => {
    
//    ( welcomeText=(`Welcome, ${auth.user && auth.user.fname}!`) );
//   }
    
  
  
//   return (
//     <>
     
//       <div onClick={handleLogOut}>
//         <IoIcons.IoIosLogOut />
//       </div>
//     </>
//   );
// };

// export const AdminSidebarData = [ 
//   {
//     icon:<welcome/>
//   },
//   { 
//     title: 'Profile',
//     path: '/about',
//     icon: <AiIcons.AiFillHome />
//   },
//   {
//     title: 'My Tasks',
//     path: '/calender',
//     icon: <IoIcons.IoIosPaper />,
//   },
//   {
//     title: 'Records',
//     path: '/history',
//     icon: <FaIcons.FaHistory />
//   },
//   {
//     title: 'Send Notifications',
//     path: '/messages',
//     icon: <FaIcons.FaEnvelopeOpenText />,
//   },
//   {
//     title: 'Queries',
//     path: '/Query',
//     icon: <IoIcons.IoMdHelpCircle />
//   },
//   {
//     title: 'Logout',
//     path:'/home',
//     icon: <LogoutButton/>,
//   }
// ];
// export default AdminSidebarData
import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { useContext, AuthContext } from "../../context/auth";
import { toast } from "react-toastify"; 
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  
  const handleLogOut = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth")
    navigate('/home')
    toast.success(`Logged out ${auth.user && auth.user.fname}`)
  };

  return (
    <>     
      <div onClick={handleLogOut}>
        <IoIcons.IoIosLogOut />
      </div>
    </>
  );
};

const welcomeText = (auth) => `Welcome, ${auth.user && auth.user.fname}!`;

export const AdminSidebarData = [ 
  {
    title: '',
    icon: welcomeText,
    
  },
  { 
    title: 'Profile',
    path: '/about',
    icon: <AiIcons.AiFillHome />
  },
  {
    title: 'My Tasks',
    path: '/calender',
    icon: <IoIcons.IoIosPaper />,
  },
  {
    title: 'Records',
    path: '/MyTasks.js',
    icon: <FaIcons.FaHistory />
  },
  {
    title: 'Send Notifications',
    path: '/messages',
    icon: <FaIcons.FaEnvelopeOpenText />,
  },
  {
    title: 'Queries',
    path: '/Query',
    icon: <IoIcons.IoMdHelpCircle />
  },
  {
    title: 'Logout',
    path:'/home',
    icon: <LogoutButton/>,
  }
];

export default AdminSidebarData;
