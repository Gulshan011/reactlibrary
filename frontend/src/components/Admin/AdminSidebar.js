import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import { motion } from 'framer-motion';

import * as AiIcons from 'react-icons/ai';
import { AdminSidebarData } from './AdminSidebarData.js';
import AdminSubMenu from './AdminSubMenu';
import { IconContext } from 'react-icons/lib';

const Nav = styled.div`
  background: #1e1e2f;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family:"Poppins",sans-serif;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family:"Poppins",sans-serif;
color:#000000;
`;
const sidebarVariants = {
  open: {
    width: '250px',
    left: '0',
    transition: {
      type: 'spring',
      stiffness: 50,
      damping: 10,
    },
  },
  closed: {
    width: '80px',
    left: '-170px',
    transition: {
      type: 'spring',
      stiffness: 50,
      damping: 10,
    },
  },
};
const SidebarNav = styled(motion.nav)`
background: #20232a;
width: 250px;
height: 100vh;
display: flex;
justify-content: center;
position: fixed;
top: 0;
left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
z-index: 10;
`;

const SidebarWrap = styled(motion.div)`
width: 100%;
`;

const AdminSidebar = () => {
 
  const [sidebar, setSidebar] = useState({ isOpen: false });
const showSidebar = () => setSidebar({ isOpen: !sidebar.isOpen });

  
  return (
    <> 
    <motion.div>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
     
          <NavIcon to=''>

            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
          <NavIcon to='/Home'>
          <AiIcons.AiFillHome />
        </NavIcon>
        </Nav>
      
        
        <SidebarNav 
        initial={sidebar.isOpen ? 'open' : 'closed'}
  animate={sidebar.isOpen ? 'open' : 'closed'}
  variants={sidebarVariants}
  sidebar={sidebar.isOpen}>
      
          <SidebarWrap  initial={sidebar.isOpen ? 'open' : 'closed'}
          animate={sidebar.isOpen ? 'open' : 'closed'}
          variants={sidebarVariants}
          sidebar={sidebar.isOpen}>
            <NavIcon to=''>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {AdminSidebarData.map((item, index) => 
              {
               return <AdminSubMenu item={item} key={index} />;
             })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
      </motion.div>
    </>
  );
          }
export default AdminSidebar
