import React, { useState } from "react";
import { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./AdminCalender.css";
import { Select } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import AdminSidebar from "../AdminSidebar";
import * as IoIcons from "react-icons/io";
import Title from "antd/es/skeleton/Title";
const { Option } = Select;
 function AdminCalendar() {
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
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  useEffect(() => {
    fetch('http://localhost:8081/api/v1/auth/taskslist')
    .then(res => res.json())
    .then(data => setTaskList(data.data))
    .catch(error => console.log(error));
}, []);
useEffect(() => {
  // Filter events based on search term
  const filteredEvents = taskList.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Convert filtered events to FullCalendar compatible format
  const events = filteredEvents.map((task) => ({
    title: task.title,
    start: new Date(task.start),
    end: new Date(task.end),
    backgroundColor: getBackgroundColor(task.priority),
    borderColor: getBorderColor(task.priority)
 
  }));
  setNewEvent(events);
}, [taskList, searchTerm]);
const getBackgroundColor = (priority) => {
  switch (priority) {
    case "High":
      return "#d86161";
    case "Medium":
      return "##5a80c7";
    case "Low":
      return "#c9c159";
   
  }
};

const getBorderColor = (priority) => {
  switch (priority) {
    case "High":
      return "#000000";
    case "Medium":
      return "#000000";
    case "Low":
      return "#000000";
   
  }
};
const handleSelect = (arg) => {
  setFormValues({ title: "", start: arg.start, end: arg.end });
  setShowForm(true);
  const container = document.querySelector(".cal-container");
  container.classList.add("fade");
  // Wait for the transition to complete before removing the class
//   setTimeout(() => {
//     container.classList.remove("fade");
//   }, 500);
// };

};
const handleTaskCloseClick = () => {
  setSelectedEvent(null);
  setShowForm(false);
  const container = document.querySelector(".cal-container");
  container.classList.remove("fade");
};

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { title, start, end } = formValues;
    const newTask = {
      title,
      start,
      end,
    };

    const response = await axios.post(
      `http://localhost:8081/api/v1/auth/addtasks`,
      {
        title,
        start,
        end,
        priority
      }
    );
    const { success, data, message } = response.data;

    if (success) {
      toast.success(message);
      setNewEvent((prevState) => [...prevState, data]);
      setShowForm(false);
      setFormValues({ title: "", start: "", end: "" });
    } else {
      toast.error(message);
    }
  //   // Save the new task to local storage
   
    setNewEvent((prevState) => [...prevState, newTask]);
    setShowForm(false);
    setFormValues({ title: "", start: "", end: "" });
  };

  const handleFormChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleEventClick = (arg) => {
    setSelectedEvent(arg.event);
  };

  const handleDeleteClick = () => {
    setNewEvent((prevState) =>
      prevState.filter((task) => task !== selectedEvent)
    );
    setSelectedEvent(null);
  };
  const handleUpdateClick = () => {
  
   
  }
  const handleCloseClick = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="calendar-container ">
      <AdminSidebar />

      {selectedEvent && (
        <div className="event-overlay">
        <div className="event-details ">
          <h2>{selectedEvent.title}</h2>
          <p>
            Start: {selectedEvent?.start?.toLocaleDateString()} | End:{" "}
            {selectedEvent?.end?.toLocaleDateString()}
          
          </p>

          <button className="btn btn-danger" onClick={handleDeleteClick}>
            Delete Task
          </button>
          <button className="btn btn-success" onClick={handleUpdateClick}>
            Update Task
          </button>
         
          <button className="close-btn" onClick={(handleCloseClick ) }>
          <IoIcons.IoIosClose />
        </button>
        </div>
        </div>
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
      
    
      backgroundColor={"#00000"} // Update background color here
      selectable={true}
      select={handleSelect}
      events={newEvent}
      eventClick={handleEventClick}
  />
  
  </div>
      {showForm && (
        <form onSubmit={handleFormSubmit} className="add-task-form" >
          <button className="close-btn" onClick={(handleTaskCloseClick ) }>
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
        <label htmlFor="priority">Set Priority</label>
        <Select
          bordered={false}
          placeholder="Set Priority "
          size="large"
          showSearch
          className="form-select mb-3"
          onChange={(value) => {
            setPriority(value);
          }}
          value={ formValues.priority}
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
    </div>
  );
}
       export default AdminCalendar;

