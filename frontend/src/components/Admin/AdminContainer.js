
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import { motion } from 'framer-motion';
import Widgets from './widgets/Widgets';
  import Featured from './Featuredchart/Featured';
  import Chart from './Chart/Chart';
  import List from './table/Table';
import * as AiIcons from 'react-icons/ai';
import { AdminSidebarData } from './AdminSidebarData.js';
import AdminSubMenu from './AdminSubMenu';
import { IconContext } from 'react-icons/lib';

import './widgets/widgets.css';

const Nav = styled.div`
  background-color: #1e1e2f;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family: "Poppins", sans-serif;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family: "Poppins", sans-serif;
  background-color: #1e1e2f;
`;

const sidebarVariants = {
  open: {
    width: '345px',
    left: '0',
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 20,
    },
  },
  closed: {
    width: '80px',
    left: '-345px',
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 20,
    },
  },
};

const contentVariants = {
  open: {
    marginLeft: '345px',
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 20,
    },
  },
  closed: {
    marginLeft: '0px',
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 20,
    },
  },
};

const SidebarNav = styled(motion.nav)`
  background-color: #1e1e2f;
  width: 345px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-345px')};
  z-index: 10;
`;

const SidebarWrap = styled(motion.div)`
  width: 100%;
  flex: 1;
`;

const AdminContainer = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <motion.div>
        <IconContext.Provider value={{ color: '#fff' }}>
          <Nav>
            <NavIcon to=''>
              <FaIcons.FaBars onClick={toggleSidebar} />
            </NavIcon>
            <NavIcon to='/Home'>
              <AiIcons.AiFillHome />
            </NavIcon>
          </Nav>

          <SidebarNav
            initial={sidebarOpen ? 'open' : 'closed'}
            animate={sidebarOpen ? 'open' : 'closed'}
            variants={sidebarVariants}
            sidebar={sidebarOpen}
          >
            <SidebarWrap
              initial={sidebarOpen ? 'open' : 'closed'}
              animate={sidebarOpen ? 'open' : 'closed'}
              variants={sidebarVariants}
              sidebar={sidebarOpen}
            >
              <NavIcon to=''>
                <AiIcons.AiOutlineClose onClick={toggleSidebar} />
              </NavIcon>
              {AdminSidebarData.map((item, index) => {
                return <AdminSubMenu item={item} key={index} />;
              })}
            </SidebarWrap>
          </SidebarNav>

          <AdminContent
            initial={sidebarOpen ? 'open' : 'closed'}
            animate={sidebarOpen ? 'open' : 'closed'}
            variants={contentVariants}
          >
            <div className='widgets'>
              <Widgets type='user' />
              <Widgets type='books' />
              <Widgets type='status' />
            </div>
            <div className='charts'>
              <Featured />
              <Chart />
            </div>
            <div className='listContainer'>
              <div className='listTitle'>Latest issues</div>
              <List />
            </div>
          </AdminContent>
        </IconContext.Provider>
      </motion.div>
    </>
  );
};

const AdminContent = styled(motion.div)`
  margin-left: ${({ animate }) => (animate === 'open' ? '345px' : '80px')};
  transition: margin-left 0.01s ease-in-out;
  background-color: #1e1e2f;
`;

export default AdminContainer;
