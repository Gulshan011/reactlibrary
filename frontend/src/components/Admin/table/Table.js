// // import React from 'react'
// // import './Table.css'
// // import Table from "@mui/material/Table";
// // import TableBody from "@mui/material/TableBody";
// // import TableCell from "@mui/material/TableCell";
// // import TableContainer from "@mui/material/TableContainer";
// // import TableHead from "@mui/material/TableHead";
// // import TableRow from "@mui/material/TableRow";
// // import Paper from "@mui/material/Paper";

// // const List= () => {
  
// //   return (
// //     <TableContainer component={Paper} className="table">
// //       <Table sx={{ minWidth: 650 }} aria-label="simple table">
// //         <TableHead>
// //           <TableRow>
// //             <TableCell className="tableCell">ID</TableCell>
// //             <TableCell className="tableCell">Bookname</TableCell>
// //             <TableCell className="tableCell">Issuedby</TableCell>
// //             <TableCell className="tableCell">Date</TableCell>
// //             <TableCell className="tableCell">Author</TableCell>
// //            <TableCell className="tableCell">Status</TableCell>
// //           </TableRow>
// //         </TableHead>
// //         <TableBody>
// //           {rows.map((row) => (
// //             <TableRow key={row.id}>
// //               <TableCell className="tableCell">{row.id}</TableCell>
// //               <TableCell className="tableCell">
// //                 <div className="cellWrapper">
// //                   <img src={row.img} alt="" className="image" />
// //                   {row.Bookname}
// //                 </div>
// //               </TableCell>
// //               <TableCell className="tableCell">{row.Issuedby}</TableCell>
// //               <TableCell className="tableCell">{row.date}</TableCell>
// //               <TableCell className="tableCell">{row.author}</TableCell>
             
// //               <TableCell className="tableCell">
// //                 <span className={`status ${row.status}`}>{row.status}</span>
// //               </TableCell>
// //             </TableRow>
// //           ))}
// //         </TableBody>
// //       </Table>
// //     </TableContainer>
// //   );
// // };




// // export default List;

// import { useState, useEffect } from 'react';

// import Table from 'react-bootstrap/Table';
// import { Select } from "antd";
// const { Option } = Select;
// function List() {
//   const [bookList, setBookList] = useState([]);
//   const [status, setStatus] = useState([
//         "Not Process",
//         "Processing",
//         "Shipped",
//         "deliverd",
//         "cancel",
//       ]);
  
//   useEffect(() => {
//     fetch('http://localhost:8081/api/v1/auth/booklist')
//       .then(res => res.json())
//       .then(data => setBookList(data.data))
//       .catch(error => console.log(error));
//   }, []);

//   return (
//     <div>
   
//       <div className='tablecontainer-center'>
//           <div className="table-responsive">
//             <Table striped bordered hover variant="light">
//         <thead>
//           <tr>
           
//             <th>Book Name</th>
//             <th>Publisher</th>
//              <th>Issued By</th>
//             <th>Issued On</th>
//             <th>Returned Date</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {bookList.map((book, index) => (
//             <tr key={index}>
//             <td>{book.bookname}</td>
//             <td>{book.publisher}</td>
//             <td>{book.fname}</td>
//             <td>{book.issuedDate.split("T")[0]}</td>
//             <td>{book.returnDate && book.returnDate.split("T")[0]}</td>
//             <td>{book.status}</td>
//             </tr>
//           ))}
//         </tbody>
//      </Table>
//           </div>
//         </div>
//         </div>
//   );
// }

// export default List;
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Select } from "antd";

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

