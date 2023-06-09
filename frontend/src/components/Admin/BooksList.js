
import { useState, useEffect, useContext } from "react";
import AdminSidebar from "../Admin/AdminSidebar";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Table from "react-bootstrap/Table";
import { Select } from "antd";
import moment from "moment";
import { FaBell } from "react-icons/fa";




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
      const response = await axios.post("http://localhost:8081/api/v1/auth/send-notification", {
        sender,
        receiver,
        message
      });
     
      if (response.status === 200) {
        // Swal.fire({
        //   icon:"bell",
        //   title: "Success!",
        //   text: response.data.message,
     
        //   timer: 2000,
        //   showConfirmButton: false,
        //  } );
         Swal.fire({
          title: 'Success',
          width: 600,
          padding: '3em',
          color: '#716add',
          background: '#fff url(/images/trees.png)',
          backdrop: `
            rgba(0,0,123,0.4)
            url(https://media.tenor.com/aJumv0mMceoAAAAi/cheer-cheering.gif)
            left top
            no-repeat
          `
        })
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
        })
      }
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  

  return (
    <div>
      <AdminSidebar />
      <div className="admin-booklist-container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Issued By</th>
              <th>Issued On</th>
              <th>Return Date</th>
              <th>Status</th>
              <th>Notification</th>
            </tr>
          </thead>
          <tbody>
            {bookList.map((book, index) => (
              <tr key={book._id}>
                <td>{book.bookname}</td>
                <td>{book.publisher}</td>
                <td>{book.fname}</td>
                <td>{book.issuedDate.split("T")[0]}</td>
                <td
                  className={
                    isReturnDateCloser(book.returnDate) ? "text-danger" : ""
                  }
                >
                  {book.returnDate && book.returnDate.split("T")[0]}
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
                        `${book.fname}`,
                        ` Hey ${book.fname} return date is approaching .Plese return ${book.bookname} on time`
                      )
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default BookList;
