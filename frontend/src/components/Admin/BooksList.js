
import { useState, useEffect } from 'react';
import AdminSidebar from '../Admin/AdminSidebar';
import Table from 'react-bootstrap/Table';
import { Select } from "antd";
const { Option } = Select;
function BookList() {
  const [bookList, setBookList] = useState([]);
  const [status, setStatus] = useState([
        "Online Issued ",
        "Book Collected",
        "Returned ",
       
      ]);
  
  useEffect(() => {
    fetch('http://localhost:8081/api/v1/auth/booklist')
      .then(res => res.json())
      .then(data => setBookList(data.data))
      .catch(error => console.log(error));
  }, []);
  

  return (
    <div>
      <AdminSidebar/>
  
      <br></br>
      <div className='tablecontainer-center' >
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
          </tr>
        </thead>
        <tbody>
          {bookList.map((book, index) => (
            <tr key={index}>
            <td>{book.bookname}</td>
            <td>{book.publisher}</td>
            <td>{book.fname}</td>
            <td>{book.issuedDate.split("T")[0]}</td>
            <td>{book.returnDate && book.returnDate.split("T")[0]}</td>
            <td>{book.status}</td>
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

