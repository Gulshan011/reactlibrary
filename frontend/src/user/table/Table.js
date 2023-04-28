import React from 'react'
import './Table.css'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List= () => {
  const rows = [
    {
      id: 1143155,
     Bookname: "",
      img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      Issuedby: "John Smith",
      date: "1 March",
     author: 785,
      status: "Approved",
    },
    {
      id: 2235235,
     Bookname: "XYZ",
      img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
      Issuedby: "Michael Doe",
      date: "1 March",
     author: "900",
     status: "Pending",
    },
    {
      id: 2342353,
      Bookname: "RXYZ",
      img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
      Issuedby: "John Smith",
      date: "1 March",
     author:" 35",
      status: "Pending",
    },
    {
      id: 2357741,
      Bookname: "XYZ",
      img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
      Issuedby: "Jane Smith",
      date: "1 March",
     author: 920,
     status: "Approved",
    },
    {
      id: 2342355,
      Bookname: "XYZ",
      img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
      Issuedby: "Harold Carol",
      date: "1 March",
     author: 2000,
      status: "Pending",
    },
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID</TableCell>
            <TableCell className="tableCell">Bookname</TableCell>
            <TableCell className="tableCell">Issuedby</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Author</TableCell>
           <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.Bookname}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.Issuedby}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">{row.author}</TableCell>
             
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};




export default List;