import React from 'react';
import { useContext, AuthContext } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

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
    <div onClick={handleLogOut}>
   
      <IoIcons.IoIosLogOut />
    </div>
  );
};

export const SidebarData = [
  {
    title: 'UserProfile',
    path: '/about',
    icon: <AiIcons.AiFillHome />
  },
  {
    title: 'My Tasks',
    path: '/calender',
    icon: <IoIcons.IoIosPaper />,
  },
  {
    title: 'History',
    path: '/history',
    icon: <FaIcons.FaHistory />
  },
  {
    title: 'Messages',
    path: '/messages',
    icon: <FaIcons.FaEnvelopeOpenText />,
  },
  {
    title: 'Ask for help',
    path: '/Query',
    icon: <IoIcons.IoMdHelpCircle />
  },
  {
    title: 'Issue book',
    path: '/issuebook',
    icon: <FaIcons.FaBoxTissue />
  },
  {
    title: 'Logout',
    path:'/home',
    icon: <LogoutButton />,
  }
];

export default SidebarData;




