
import { useState, useEffect } from "react";
import Sidebar from "../user/Sidebar";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { useContext, AuthContext } from "../../context/auth";

import Swal from "sweetalert2";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import { motion } from 'framer-motion';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData.js';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
import NotificationComponent from '../user/Messages'; // Import the NotificationComponent
import EmailComponent from '../user/Emails';
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

const History = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const { auth } = useContext(AuthContext);
  const fname = auth.user && auth.user.fname;
  const [showWork, setShowWork] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    start: "",
    end: "",
    fname: auth.user && auth.user.fname,
  });
  const [bookList, setBookList] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8081/api/v1/auth/booklist/${fname}`)
      .then((res) => res.json())
      .then((data) => setBookList(data.data))
      .catch((error) => console.log(error));
  }, [fname]);

  const handleIconClick = () => {
    Swal.fire({
      title: "Confirmation",
      text: "Are you sure you want to open the Work component?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        setShowWork(true);
      }
    });
  };

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
          <NavIcon to='#'>
          <NotificationComponent /> {/* Add the NotificationComponent */}
        </NavIcon>
        <NavIcon to='#'>
          <EmailComponent /> {/* Add the NotificationComponent */}
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
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>

        <AdminContent
          initial={sidebarOpen ? 'open' : 'closed'}
          animate={sidebarOpen ? 'open' : 'closed'}
          variants={contentVariants}
        >
      <br />
      <div className="tablecontainer-center">
        <div className="table-responsive">
        <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>BookName</th>
            <th>Publisher</th>
            <th>Owned By</th>
            <th>Issued Date</th>
            <th>Return Date</th>
          </tr>
        </thead>
        <tbody>
          {bookList.map((book, index) => (
            <tr key={index}>
              <td>{book.bookname}</td>
              <td>{book.publisher}</td>
              <td>{book.fname}</td>
              <td>{book.issuedDate && book.issuedDate.split("T")[0]}</td>
              <td>{book.returnDate && book.returnDate.split("T")[0]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
        </div>
       
      </div>
      </AdminContent>
      </IconContext.Provider>
    </motion.div>
  </>
    </div>
  );
};
const AdminContent = styled(motion.div)`
  margin-left: ${({ animate }) => (animate === 'open' ? '345px' : '80px')};
  transition: margin-left 0.01s ease-in-out;
  background-color: #1e1e2f;
`;
export default History;
