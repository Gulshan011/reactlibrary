
import { useState, useEffect, useContext } from "react";
import AdminSidebar from "../Admin/AdminSidebar";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Table from "react-bootstrap/Table";
import { Select } from "antd";
import moment from "moment";
import { FaBell } from "react-icons/fa";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import { motion } from 'framer-motion';
import * as AiIcons from 'react-icons/ai';
import { AdminSidebarData } from './AdminSidebarData.js';
import AdminSubMenu from './AdminSubMenu';
import { IconContext } from 'react-icons/lib';
const { Option } = Select;

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

function BookList() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const [bookList, setBookList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [status, setStatus] = useState([
    "Not collected",
    "issued",
    "Collected",
    "Returned",
    "Reissued",
  ]);

  useEffect(() => {
    fetchBookList();
  }, []);

  const fetchBookList = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/v1/auth/booklist");
      setBookList(response.data.data);
    } catch (error) {
      console.error("Error fetching book list:", error);
    }
  };

  const handleChange = async (id, value) => {
    try {
      if (value === "Returned") {
        // Make an API call to delete the book if status is "Returned"
        await axios.delete(`http://localhost:8081/api/v1/auth/deletebook/${id}`);
        // Filter out the book from the bookList state
        setBookList((prevBookList) =>
          prevBookList.filter((book) => book._id !== id)
        );
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this! ⚠️",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: 'LightSeaGreen',
          cancelButtonColor: 'Crimson',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
          }
        });
        return;
      }

      const { data } = await axios.put(
        `http://localhost:8081/api/v1/auth/update-status/${id}`,
        {
          status: value,
        }
      );

      setBookList((prevBookList) =>
        prevBookList.map((book) =>
          book._id === id ? { ...book, status: value } : book
        )
      );

      if (data.success) {
        toast.success("Updated successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isReturnDateCloser = (returnDate) => {
    const currentDate = moment();
    const formattedReturnDate = moment(returnDate);
    const daysDifference = formattedReturnDate.diff(currentDate, "days");
    return daysDifference <= 7;
  };

  const handleNotification = async (sender, receiver, message) => {
    try {
      setSelectedUser(receiver); // Set selectedUser as the receiver
      
      const response = await axios.post("http://localhost:8081/api/v1/auth/send-notification", {
        sender,
        receiver,
        message
      });
     
      if (response.status === 200) {
        Swal.fire({
          title: 'Success',
          width: 600,
          showCloseButton:true,
          padding: '3em',
          color: '#716add',
          background: '#fff url(/images/trees.png)',
          backdrop: `
            rgba(0,0,123,0.4)
            url(https://media.tenor.com/aJumv0mMceoAAAAi/cheer-cheering.gif)
            left top
            no-repeat
          `
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
      console.error("Error sending notification:", error);
    }
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
      <div className="admin-booklist-container">
        <Table striped bordered hover>
          <thead style={{color:"white"}}>
            <tr>
              <th>Title </th>
              <th>Author</th>
              <th>Issued By</th>
              <th>Issued On</th>
              <th>Return Date</th>
              <th>Status</th>
              <th>Notification</th>
            </tr>
          </thead>
          <tbody>
            {bookList.map((book) => (
              <tr key={book._id}>
                <td>{book.bookname}</td>
                <td>{book.publisher}</td>
                <td>{book.fname}</td>
                <td>{moment(book.issuedDate).format("YYYY-MM-DD")}</td>
                <td
                  className={
                    isReturnDateCloser(book.returnDate) ? "text-danger" : ""
                  }
                >
                  {moment(book.returnDate).format("YYYY-MM-DD")}
                </td>
                <td>
                  <Select
                    defaultValue={book.status}
                    style={{ width: 120 }}
                    onChange={(value) => handleChange(book._id, value)}
                  >
                    {status.map((item) => (
                      <Option value={item} key={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </td>
                <td>
                  <FaBell
                    className="bell-icon"
                    onClick={() =>
                      handleNotification(
                        "Admin",
                        book.fname,
                        `Hey ${book.fname}, the return date for ${book.bookname} is approaching. Please return it on time.`
                      )
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
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

export default BookList;
