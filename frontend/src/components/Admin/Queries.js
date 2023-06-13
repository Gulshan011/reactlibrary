
  
import React, { useState, useEffect } from "react";
import AdminSidebar from "../Admin/AdminSidebar";
import Table from "react-bootstrap/Table";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import { motion } from 'framer-motion';
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import * as AiIcons from 'react-icons/ai';
import { AdminSidebarData } from './AdminSidebarData.js';
import AdminSubMenu from './AdminSubMenu';
import { IconContext } from 'react-icons/lib';
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

function Queries() {
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  useEffect(() => {
    fetch("http://localhost:8081/api/v1/auth/querylist")
      .then((res) => res.json())
      .then((data) => setUserList(data.data))
      .catch((error) => console.log(error));
  }, []);

  const handleReply = (user) => {
    setSelectedUser(user);
    setReplyMessage("");
    setShowModal(true);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8081/api/v1/auth/send-email", {
        query:selectedUser.query,
          email: selectedUser.email,
          message: replyMessage,
       
        
      });
      if (res && res.data.success) {
        Swal.fire({
          title: "Success!",
          text: res.data.message,
          icon: "success",
          timer: 2000,
          width: 600,
          padding: '3em',
          color: '#716add',
          background: '#fff url(/images/trees.png)',
          backdrop: `
            rgba(0,0,123,0.4)
            url(https://media.tenor.com/aJumv0mMceoAAAAi/cheer-cheering.gif)
            left top
            no-repeat
          `,
          showConfirmButton: false,
         
        });
      } else {
        Swal.fire({
          title: 'Error',
          width: 600,
          padding: '3em',
          color: '#716add',
          background: '#fff url(/images/trees.png)',
          backdrop: `
            rgba(0,0,123,0.4)
            url(https://media.tenor.com/ptwljHtCNosAAAAi/peachcat-cat.gif)
            left top
            no-repeat
          `
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Error',
        width: 600,
        padding: '3em',
        color: '#716add',
        background: '#fff url(/images/trees.png)',
        backdrop: `
          rgba(0,0,123,0.4)
          url(https://media.tenor.com/ptwljHtCNosAAAAi/peachcat-cat.gif)
          left top
          no-repeat
        `
      });
    }
  }
  return (
    <div>
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
     
      <div className="tablecontainer-center">
        <div className="table-responsive">
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>FirstName</th>
                <th>Email</th>
                <th>Query</th>
                <th>Reply to a query</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user, index) => (
                <tr key={index}>
                  <td>{user.fname}</td>
                  <td>{user.email}</td>
                  <td>{user.query}</td>
                  <td>
                    <Button onClick={() => handleReply(user)}>Reply</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reply to Query</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>User: {selectedUser?.fname}</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSendMessage}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
      </AdminContent>
        </IconContext.Provider>
      </motion.div>
    </>
    </div>
  );
}
const AdminContent = styled(motion.div)`
  margin-left: ${({ animate }) => (animate === 'open' ? '345px' : '80px')};
  transition: margin-left 0.01s ease-in-out;
  background-color: #1e1e2f;
`;
export default Queries;
