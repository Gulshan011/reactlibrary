

import { useState, useEffect } from "react";
import Sidebar from "../user/Sidebar";
import Table from "react-bootstrap/Table";

import { useContext, AuthContext } from "../../context/auth";



const History = ()=> {
  
  const { auth } = useContext(AuthContext);
  const fname = auth.user && auth.user.fname; 
  const [formValues, setFormValues] = useState({
    title: "",
    start: "",
    end: "",
    fname:auth.user && auth.user.fname
  });
  const [bookList, setBookList] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8081/api/v1/auth/booklist/${fname}`)
      .then(res => res.json())
      .then(data => setBookList(data.data))
      .catch(error => console.log(error));
  }, [fname]);

  return (
    <div>
      <Sidebar />
      <br></br>
      <div className="tablecontainer-center">
        <div className="table-responsive">
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>BookName</th>
               <th>Publisher</th>
               <th>Owned By</th>
                <th>Issued Date</th>
                <th>ReturnDate</th>
                
                
              </tr>
            </thead>
            <tbody>
              {bookList.map((book, index) => (
                <tr key={index}>
                <td>{book.bookname}</td>
                <td>{book.publisher}</td>
                <td>{book.fname}</td>
                <td>{book.issuedDate&& book.issuedDate.split("T")[0]}</td>
                <td>
                  {book.returnDate && book.returnDate.split("T")[0]}
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

export default History;


