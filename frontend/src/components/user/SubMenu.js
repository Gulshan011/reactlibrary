import React, { useContext, useState } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { AuthContext } from '../../context/auth';
import Swal from "sweetalert2";  
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
  font-family:"Poppins",sans-serif;

  &:hover {
    background: #252831;
    border-left: 4px solid #632ce4;
    cursor: pointer;
    color:cyan;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;



const SubMenu = ({ item }) => {
  const navigate = useNavigate();
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);
  const { auth, setAuth } = useContext(AuthContext);

  
  const handleLogOut = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    localStorage.removeItem("inboxChecked");
   
        Swal.fire({
          title: "Success!",
          text: "Logged out!!!",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
          didClose: () => {
           
            navigate("/login");
          },
        });
     

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
      }      <SidebarLabel>{item.icon}</SidebarLabel>
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
       
      </SidebarLink>
      
    </>
  );
};

export default SubMenu;