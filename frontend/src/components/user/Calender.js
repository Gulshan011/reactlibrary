import React, { useState } from "react";
import { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { Select } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "../user/Sidebar";
import * as IoIcons from "react-icons/io";
import Title from "antd/es/skeleton/Title";
const { Option } = Select;
function Calendar() {
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
  const[selectedTask,setSelectedTask]=useState(null);

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
///add user api -------------------------
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { title, start, end } = formValues;
    const newTask = {
      title,
      start,
      end,
      priority,
    };

    const response = await axios.post(
      `http://localhost:8081/api/v1/auth//useraddtasks`,
      {
        title,
        start,
        end,
        priority,
      }
    );
    const { success, data, message } = response.data;

    if (success) {
      toast.success(message);
      setNewEvent((prevState) => [...prevState, data]);
      setShowForm(false);
      setFormValues({ title: "", start: "", end: "", priority: "" });
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

  const handleDeleteClick = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8081/api/v1/auth/deleteusertasks/${id}`
      );
      if (data.success) {
        toast.success(`Deleted successfully`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };

  const handleUpdateClick = () => {
    setShowUpdateForm(true);
  };

  const handleMouseEnter = (arg) => {
    const taskId = arg.event.id;
    const task = taskList.find((task) => task._id === taskId);
    const taskDescription = task.description;
    console.log("entered")
    setSelectedTask(taskDescription);
  };

  const handleMouseLeave = () => {
   
    setSelectedTask("");
  };
 
  const handleCloseClick = () => {
    setSelectedEvent(null);
  };

  //fetching list of task
  useEffect(() => {
    fetch("http://localhost:8081/api/v1/auth/usertaskslist")
      .then((res) => res.json())
      .then((data) => setTaskList(data.data))
      .catch((error) => console.log(error));
  }, []);
  
  useEffect(() => {
    // Filter events based on search term
    const filteredEvents = taskList.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Convert filtered events to FullCalendar compatible format
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
  }, [taskList, searchTerm]);
  const getBackgroundColor = (priority) => {
    switch (priority) {
      case "High":
        return "#d86161";
      case "Medium":
        return "#feba30";
      case "Low":
        return "#c9c159";
      default:
        return "#1f2424";
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
      default:
        return "#000000";
    }
  };
  //.............................................
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
      toast.success(message);

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
        backgroundColor: getNewBackgroundColor(task.priority),
        borderColor: getNewBorderColor(task.priority),
      }));

      setNewEvent(events);
      setShowForm(false);
    } else {
      toast.error(message);
    }
  };
  const getNewBackgroundColor = (priority) => {
    switch (priority) {
      case "High":
        return "#d86161";
      case "Medium":
        return "#5a80c7";
      case "Low":
        return "#c9c159";
      default:
        return "#000000";
    }
  };

  const getNewBorderColor = (priority) => {
    switch (priority) {
      case "High":
        return "#000000";
      case "Medium":
        return "#000000";
      case "Low":
        return "#000000";
      default:
        return "#000000";
    }
  };


  return (
    <div className="calendar-container ">
      <Sidebar />
     {selectedTask&&(
      <div className="task-description" >
      <p>{selectedTask}</p>
   
     </div>
     )}
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
                name="priority" // Add the name attribute here
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
          eventMouseEnter={handleMouseEnter} 
          eventMouseLeave={handleMouseLeave}
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
              name="priority" // Add the name attribute here
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
    </div>
  );
}
export default Calendar;
