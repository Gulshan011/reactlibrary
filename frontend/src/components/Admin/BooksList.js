
import { useState, useEffect } from "react";
import AdminSidebar from "../Admin/AdminSidebar";
import axios from "axios";
import { toast } from "react-toastify";
import Table from "react-bootstrap/Table";
import { Select } from "antd";
import { FaBell } from "react-icons/fa";
import moment from "moment";
const { Option } = Select;

function BookList() {
  const [bookList, setBookList] = useState([]);
  const [status, setStatus] = useState([
    "Not collected",
    "issued",
    "Collected",
    "Returned",
    "Reissued",
  ]);

  // Add a new state variable to track reminder status
  const [reminderStatus, setReminderStatus] = useState({});

  useEffect(() => {
    fetch("http://localhost:8081/api/v1/auth/booklist")
      .then((res) => res.json())
      .then((data) => {
        setBookList(data.data);

        // Initialize the reminder status for each book
        const initialReminderStatus = {};
        data.data.forEach((book) => {
          initialReminderStatus[book._id] = false;
        });
        setReminderStatus(initialReminderStatus);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = async (id, value) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8081/api/v1/auth/update-status/${id}`,
        {
          status: value,
        }
      );
      // Update the bookList state after successful status update
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
    return daysDifference <= 7; // Change the number of days as per your requirement
  };

  const sendReminder = (id) => {
    // Toggle the reminder status for the book
    setReminderStatus((prevReminderStatus) => ({
      ...prevReminderStatus,
      [id]: !prevReminderStatus[id],
    }));
  };

  return (
    <div>
      <AdminSidebar />
      <br></br>
      <div className="tablecontainer-center">
        <div className="table-responsive">
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>Book Name</th>
                <th>Publisher</th>
                <th>Issued By</th>
                <th>Issued On</th>
                <th>Returned Date</th>
                <th>Status</th>
                <th>Send Reminder</th>
              </tr>
            </thead>
            <tbody>
              {bookList.map((book, index) => (
                <tr
                  key={index}
                  className={
                    isReturnDateCloser(book.returnDate)
                      ? "closer-return-date"
                      : ""
                  }
                >
                  <td>{book.bookname}</td>
                  <td>{book.publisher}</td>
                  <td>{book.fname}</td>
                  <td>{book.issuedDate.split("T")[0]}</td>
                  <td>
                    {book.returnDate && book.returnDate.split("T")[0]}
                  </td>
                  <td>
                    <Select
                      onChange={(value) => handleChange(book._id, value)}
                      defaultValue={book.status}
                    >
                      {status.map((status, index) => (
                        <Option key={index} value={status}>
                          {status}
                        </Option>
                      ))}
                    </Select>
                  </td>
                  <td>
                    <button onClick={() => sendReminder(book._id)}>
                      <FaBell />
                    </button>
                  
                
                    {reminderStatus[book._id] && toast.success("Reminder Sent!")}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default BookList;

