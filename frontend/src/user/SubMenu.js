import React, { useContext, useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { AuthContext } from '../context/auth';

const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    background: #252831;
    border-left: 4px solid #632ce4;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;



const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);
  const { auth, setAuth } = useContext(AuthContext);

  
  const handleLogOut = () => {
    
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth") && redirect('/home')
    toast.success(`Logged out ${auth.user && auth.user.fname}`)
  };

  const onClick=()=>{
    if(item.title === "Logout"){
      handleLogOut();
    }
    item.subNav && showSubnav();
  }
  return (
    <>
      <SidebarLink to={item.path} onClick={onClick}>
        <div>
        {item.icon && typeof item.icon === 'function' && item.icon(auth)
      }
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
       
      </SidebarLink>
      
    </>
  );
};

export default SubMenu;