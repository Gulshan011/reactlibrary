import React, { useState } from "react";
import { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import Swal from "sweetalert2";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Select } from "antd";
import axios from "axios";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import { motion } from 'framer-motion';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from '../SidebarData';
import SubMenu from '../SubMenu';
import { IconContext } from 'react-icons/lib';
import NotificationComponent from '../Messages'; // Import the NotificationComponent
import EmailComponent from '../Emails';
import { toast } from "react-toastify";
import Sidebar from "../Sidebar";
import * as IoIcons from "react-icons/io";
import { useContext, AuthContext } from "../../../context/auth";
import { getBackgroundColor, getBorderColor } from "../../Admin/AdminCalender/utils";
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

function Calendar() {
  
   const { auth } = useContext(AuthContext);
const email = auth.user && auth.user.email; // Destructure the _id property from the auth object
const [sidebarOpen, setSidebarOpen] = useState(true);

const toggleSidebar = () => {
  setSidebarOpen(!sidebarOpen);
};

  const [newEvent, setNewEvent] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [priority, setPriority] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formValues, setFormValues] = useState({
    title: "",
    start: "",
    end: "",
    email:auth.user && auth.user.email
  });
  const [selectedEvent, setSelectedEvent] = useState(null);

  
  
  const handleSelect = (arg) => {
    setFormValues({ title: "", start: arg.start, end: arg.end, priority: "" });
    setShowForm(true);
    const container = document.querySelector(".cal-container");
    container.classList.add("fade");
  };
  const handleTaskCloseClick = () => {
    setSelectedEvent(null);
    setShowForm(false);
    const container = document.querySelector(".cal-container");
    container.classList.remove("fade");
  };
  ///add usertask api -------------------------
  const handleFormSubmit = async (e) => {
    e.preventDefault();
  const { title, start, end } = formValues;

  const response = await axios.post(
      `http://localhost:8081/api/v1/auth//useraddtasks`,
      {
        title,
        start,
        end,
        priority,
        email,
      }
    );
  const { success, data, message } = response.data;
  if (success) {
    Swal.fire({
     title: "Success!",
     text: message,
     icon: "success",
     timer: 2000,
     showConfirmButton: false
    })
      setNewEvent((prevState) => [...prevState, data]);

      setShowForm(false);
      setFormValues({ title: "", start: "", end: "", priority: ""  , email:auth.user&&auth.user.email});
  } else {
      toast.error(message);
    }
  };

  //---------------------------------------------------
  const handleFormChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleEventClick = (arg) => {
    console.log(arg, "args...");
    const task = arg.event;
    console.log(task, "task...");
    setSelectedEvent(task);
  };

  //----delete task api ----
  const handleDeleteClick = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8081/api/v1/auth/deleteusertasks/${id}`
      );
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this! ⚠️",
        type: 'warning',
        showCancelButton: true,
        // Background color of the "Confirm"-button. The default color is #3085d6
        confirmButtonColor: 'LightSeaGreen',
        // Background color of the "Cancel"-button. The default color is #aaa
        cancelButtonColor: 'Crimson',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          Swal.fire({
            type: 'success',
            title: 'Deleted!',
            text: "Your file has been deleted.",
            timer: 2000,
            showCancelButton: false,
            showConfirmButton: false
          })
        }
      })
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };
   //-----------
  const handleUpdateClick = () => {
    setShowUpdateForm(true);
  };

  const handleCloseClick = () => {
    setSelectedEvent(null);
  };

  //fetching authenticated usres  list of task
  useEffect(() => {
    fetch(`http://localhost:8081/api/v1/auth/usertasks/${email}`)
      .then((res) => res.json())
      .then((data) => setTaskList(data.data))
      .catch((error) => console.log(error));
  }, [email]);
  useEffect(() => {
  const filteredEvents = taskList.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const events = filteredEvents.map((task) => ({
      id: task._id,
      title: task.title,
      start: new Date(task.start),
      end: new Date(task.end),
      priority: task.priority,
       description:task.description,
      backgroundColor: getBackgroundColor(task.priority),
      borderColor: getBorderColor(task.priority),
    }));
    setNewEvent(events);
  }, [taskList, searchTerm]);
  console.log(newEvent, "eee");
 
  //.....................updatetasks.
  const handleFormUpdate = async (e) => {
    e.preventDefault();
    const { title, start, end, description } = formValues;
    console.log(formValues);

    const response = await axios.put(
      `http://localhost:8081/api/v1/auth/userupdatetasks`,
      {
        title,
        start,
        end,
        priority,
        description,
      }
    );

    // Log the response data to check for errors
    console.log(response);

    const { success, data, message } = response.data;

    if (success) {
      Swal.fire({
       title: "Success!",
       text: message,
       icon: "success",
       timer: 2000,
       showConfirmButton: false
      })

      const filteredEvents = taskList.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log(filteredEvents, "filteredEvents...");

      const events = filteredEvents.map((task) => ({
        id: task._id,
        title: task.title,
        start: new Date(task.start),
        end: new Date(task.end),
        priority: task.priority,
        description: task.description,
        backgroundColor: getBackgroundColor(task.priority),
        borderColor: getBorderColor(task.priority),
      }));

      setNewEvent(events);
      setShowForm(false);
    } else {
      toast.error(message);
    }
  };
 

  return (
    <div className="calendar-container ">
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

      {selectedEvent && (
        <div className="event-overlay">
          <div className="event-details ">
            <h2>{selectedEvent.title}</h2>

            <p>
              Start: {selectedEvent?.start?.toLocaleDateString()} | End:{" "}
              {selectedEvent?.end?.toLocaleDateString()}
            </p>

            <button className="close-btn" onClick={handleCloseClick}>
              <IoIcons.IoIosClose />
            </button>

            <div>
              <button
                className="btn btn-danger"
                onClick={() => {
                  // setSelectedEventId(selectedEvent?.id);//
                  handleDeleteClick(selectedEvent?.id);
                }}
              >
                Delete
              </button>
            </div>

            <button className="btn btn-success" onClick={handleUpdateClick}>
              Update Task
            </button>
          </div>
        </div>
      )}
      {showUpdateForm && (
        <form onSubmit={handleFormUpdate} className="update-form">
          <div className="update-form-container">
            <button
              className="close-btn"
              onClick={() => setShowUpdateForm(false)}
            >
              <IoIcons.IoIosClose />
            </button>

            <div className="updateform-group ">
              <label htmlFor="title">Task Name</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                onChange={handleFormChange}
              />
            </div>
            <div className="updateform-group mt-2">
              <label htmlFor="start">Start Date</label>
              <input
                type="date"
                className="form-control"
                id="start"
                name="start"
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="updateform-group mt-2">
              <label htmlFor="end">End Date</label>
              <input
                type="date"
                className="form-control"
                id="end"
                name="end"
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="updateform-group mt-2">
              <label htmlFor="priority">Priority</label>
              <Select
                bordered={false}
                placeholder="Set Priority"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setPriority(value);
                }}
                name="priority"
                value={priority}
              >
                <Option value="Low">Low</Option>
                <Option value="Medium">Medium</Option>
                <Option value="High">High</Option>
              </Select>
            </div>
            <div className="updateform-group mt-2">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control description-lg"
                id="description"
                name="description"
                onChange={handleFormChange}
              />
            </div>
            <div className="button-update">
              <button type="submit" className="btn btn-success">
                Update
              </button>
            </div>
          </div>
        </form>
      )}
      <br />
      <div className={`cal-container ${selectedEvent ? "fade-out" : ""}`}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={"dayGridMonth"}
          headerToolbar={{
            start: "today prev,next",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          height={"80vh"}
          style={{ backgroundColor: "#5a80c7" }} // Update background color here
          selectable={true}
          select={handleSelect}
          events={newEvent}
          eventClick={handleEventClick}
          eventDidMount={(info) => {
            return new bootstrap.Popover(info.el, {
              title: info.event.title,
              description: info.event.extendedProps.description,
              placement: "auto",
              trigger: "hover",
              customClass: "popoverStyle",
              content: `<p>${info.event.extendedProps.description}</p>`,
              html: true,
            });
          }}
        />
      </div>

      {showForm && (
        <form onSubmit={handleFormSubmit} className="add-task-form">
          <button className="close-btn" onClick={handleTaskCloseClick}>
            <IoIcons.IoIosClose />
          </button>
          <div className="taskform-group">
            <label htmlFor="title">Task Name</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formValues.title}
              onChange={handleFormChange}
            />
          </div>
          <div className="taskform-group">
            <label htmlFor="start">Start Date</label>
            <input
              type="date"
              className="form-control"
              id="start"
              name="start"
              value={formValues.start}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="taskform-group">
            <label htmlFor="end">End Date</label>
            <input
              type="date"
              className="form-control"
              id="end"
              name="end"
              value={formValues.end}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="taskform-group">
            <label htmlFor="priority">Priority</label>
            <Select
              bordered={false}
              placeholder="Set Priority"
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => {
                setPriority(value);
              }}
              name="priority"
              value={priority}
            >
              <Option value="Low">Low</Option>
              <Option value="Medium">Medium</Option>
              <Option value="High">High</Option>
            </Select>
          </div>

          <button type="submit" className="btn btn-success">
            Add Task
          </button>
        </form>
      )}
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

export default Calendar;
