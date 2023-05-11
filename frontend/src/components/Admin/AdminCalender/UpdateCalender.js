import React, { useState } from "react";
import * as IoIcons from "react-icons/io";
import { Select } from "antd";
const { Option } = Select;

const UpdateCalender = ({ onClose }) => {
  const [formValues, setFormValues] = useState({
    title: "",
    start: "",
    end: "",
    priority: "",
  });

  const handleFormChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission logic here
    // ...
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <button className="close-btn" onClick={onClose}>
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
            setFormValues({
              ...formValues,
              priority: value,
            });
          }}
          value={formValues.priority}
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
  );
};

export default  UpdateCalender ;



// import React, { useState } from "react";
// import * as IoIcons from "react-icons/io";
// import { Select } from "antd";
// const { Option } = Select;
// const [showUpdateForm, setShowUpdateForm] = useState(false);

// const UpdateCalender
//     <form  className="add-task-form" >
//       <button className="close-btn" onClick={(handleTaskCloseClick ) }>
//         <IoIcons.IoIosClose />
//       </button>
//       <div className="taskform-group">
//         <label htmlFor="title">Task Name</label>
//         <input
//           type="text"
//           className="form-control"
//           id="title"
//           name="title"
//           value={formValues.title}
//           onChange={handleFormChange}
//         />
//       </div>
//       <div className="taskform-group">
//         <label htmlFor="start">Start Date</label>
//         <input
//           type="date"
//           className="form-control"
//           id="start"
//           name="start"
//           value={formValues.start}
//           onChange={handleFormChange}
//           required
//         />
//       </div>
//       <div className="taskform-group">
//         <label htmlFor="end">End Date</label>
//         <input
//           type="date"
//           className="form-control"
//           id="end"
//           name="end"
//           value={formValues.end}
//           onChange={handleFormChange}
//           required
//         />
//       </div>
//      <div className="taskform-group">
//     <label htmlFor="priority">Set Priority</label>
//     <Select
//       bordered={false}
//       placeholder="Set Priority "
//       size="large"
//       showSearch
//       className="form-select mb-3"
//       onChange={(value) => {
//         setPriority(value);
//       }}
//       value={ formValues.priority}
//     >
//       <Option value="Low">Low</Option>
//       <Option value="Medium">Medium</Option>
//       <Option value="High">High</Option>
//     </Select>
//   </div>

//       <button type="submit" className="btn btn-success">
//         Add Task
//       </button>
//     </form>
    
//   )}