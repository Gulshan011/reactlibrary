
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Select } from "antd";
import './Table.css'
const { Option } = Select;

function List() {
  const [bookList, setBookList] = useState([]);
  const [status, setStatus] = useState([
        "Not Process",
        "Processing",
        "Shipped",
        "deliverd",
        "cancel",
      ]);

  useEffect(() => {
    fetch('http://localhost:8081/api/v1/auth/booklist')
      .then(res => res.json())
      .then(data => setBookList(data.data))
      .catch(error => console.log(error));
  }, []);

  const latestBooks = bookList.slice(Math.max(bookList.length - 5, 0)); // get the latest 5 books
 latestBooks.sort();
  return (
    <div>
      <div className='tablecontainer-center'>
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
              {latestBooks.map((book, index) => (
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

export default List;

