
import { useState, useEffect } from "react";
import Sidebar from "../user/Sidebar";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { useContext, AuthContext } from "../../context/auth";
import Work from './Work';
import Swal from "sweetalert2";

const History = () => {
  const { auth } = useContext(AuthContext);
  const fname = auth.user && auth.user.fname;
  const [showWork, setShowWork] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    start: "",
    end: "",
    fname: auth.user && auth.user.fname,
  });
  const [bookList, setBookList] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8081/api/v1/auth/booklist/${fname}`)
      .then((res) => res.json())
      .then((data) => setBookList(data.data))
      .catch((error) => console.log(error));
  }, [fname]);

  const handleIconClick = () => {
    Swal.fire({
      title: "Confirmation",
      text: "Are you sure you want to open the Work component?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        setShowWork(true);
      }
    });
  };

  return (
    <div>
      <Sidebar />
      <br />
      <div className="tablecontainer-center">
        <div className="table-responsive">
        <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>BookName</th>
            <th>Publisher</th>
            <th>Owned By</th>
            <th>Issued Date</th>
            <th>Return Date</th>
          </tr>
        </thead>
        <tbody>
          {bookList.map((book, index) => (
            <tr key={index}>
              <td>{book.bookname}</td>
              <td>{book.publisher}</td>
              <td>{book.fname}</td>
              <td>{book.issuedDate && book.issuedDate.split("T")[0]}</td>
              <td>{book.returnDate && book.returnDate.split("T")[0]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
        </div>
        <div className="pdf-icon">
          <button onClick={handleIconClick}>
            <FontAwesomeIcon icon={faFilePdf} size="3x" />
          </button>
        </div>
        {showWork && <Work />}
      </div>
    </div>
  );
};

export default History;
