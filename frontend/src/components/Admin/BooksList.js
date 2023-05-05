// // // import React,{useEffect,useState} from 'react'
// // // import AdminSidebar from "../Admin/AdminSidebar"
// // // import { useContext, AuthContext, useAuth } from "../../context/auth";
// // // import axios from 'axios'
// // // const BooksList = () => {
// // //   const[issues,setIssues]=useState([])
// // //   const { auth, setAuth } = useContext(AuthContext);
// // //   const getIssues=async()=>{
// // //     try{
// // //       const {data}=await axios.get(`http://localhost:8081/api/v1/auth/booklist`)
// // //        setIssues(data)
// // //    }catch(error) {
// // //       console.log(error)
// // //     }   
// // //   }
// // //  useEffect(()=>{
// // //   if(auth?.token)getIssues();

// // //  },[auth?.token])

// // //   return (
// // //     <div className="row dashboard">
// // //     <div className="col-md-3">
// // //       <AdminSidebar />
// // //     </div>
// // //     <div className="col-md-9">
// // //       <h1 className="text-center">All Orders</h1>
// // //       {issues?.map((issues, i) => {
// // //         return (
// // //           <div className="border shadow">
// // //             <table className="table">
// // //               <thead>
// // //                 <tr>
// // //                   <th scope="col">#</th>
// // //                   <th scope="col">Status</th>
// // //                   <th scope="col">Buyer</th>
// // //                   <th scope="col"> date</th>
// // //                   <th scope="col">Payment</th>
// // //                   <th scope="col">Quantity</th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody>
// // //                 <tr>
// // //                   <td>{i + 1}</td>
// // //                   <td>{issues?.admin?.fname}</td>
                  
// // //                 </tr>
// // //               </tbody>
// // //             </table>
           
                 
// // //                 </div>
              
           
         
// // //         );
// // //       })}
// // //     </div>
// // //   </div>
// // //   )
// // // }

// // // export default BooksList
// // import React, { useEffect, useState } from 'react';
// // import AdminSidebar from '../Admin/AdminSidebar';
// // import axios from 'axios';

// // const BooksList = () => {
// //   const [issues, setIssues] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchIssues = async () => {
// //       try {
// //         const { data } = await axios.get('http://localhost:8081/api/v1/auth/booklist');
// //         setIssues(data);
// //         setLoading(false);
// //       } catch (error) {
// //         console.log(error);
// //       }
// //     };

// //     fetchIssues();
// //   }, []);

// //   return (
// //     <div className="row dashboard">
// //       <div className="col-md-3">
// //         <AdminSidebar />
// //       </div>
// //       <div className="col-md-9">
// //         <h1 className="text-center">All Books</h1>
// //         {loading ? (
// //           <p>Loading...</p>
// //         ) : (
// //           <table className="table">
// //             <thead>
// //               <tr>
// //                 <th scope="col">#</th>
// //                 <th scope="col">Book Name</th>
// //                 <th scope="col">Publisher</th>
// //                 <th scope="col">Issued To</th>
// //                 <th scope="col">Issued Date</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {issues.map((issue, i) => (
// //                 <tr key={i}>
// //                   <td>{i + 1}</td>
// //                   <td>{issue.bookname.name}</td>
// //                   <td>{issue.bookname.publisher}</td>
// //                   <td>{issue.user.fname}</td>
// //                   <td>{issue.user.issuedDate}</td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default BooksList;
// import React, { useEffect, useState } from 'react';
// import AdminSidebar from '../Admin/AdminSidebar';
// import axios from 'axios';

// const BooksList = () => {
//   const [issues, setIssues] = useState([]);
 
//   useEffect(() => {
//     const fetchIssues = async () => {
//       try {
//         const { data } = await axios.get('http://localhost:8081/api/v1/auth/booklist');
//         setIssues(data);
     
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchIssues();
//   }, []);

//   return (
//     <div className="row dashboard">
//       <div className="col-md-3">
//         <AdminSidebar />
//       </div>
//       <div className="col-md-9">
//         <h1 className="text-center">All Books</h1>
       
//           <table className="table">
//             <thead>
//               <tr>
//                 <th scope="col">#</th>
//                 <th scope="col">Book Name</th>
//                 <th scope="col">Publisher</th>
//                 <th scope="col">Issued To</th>
//                 <th scope="col">Issued Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {issues.map((issue, i) => (
//                 <tr key={i}>
//                   <td>{i + 1}</td>
//                   <td>{issue.bookname.fname}</td>
//                   <td>{issue.bookname.publisher}</td>
//                   <td>{`${issue.user.fname} (${issue.user.email})`}</td>
//                   <td>{issue.user.issuedDate}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
        
//       </div>
//     </div>
//   );
// };

// export default BooksList;
// import React, { useEffect, useState } from 'react';
// import AdminSidebar from '../Admin/AdminSidebar';
// import axios from 'axios';

// const BooksList = () => {
//   const [books, setBooks] = useState([]);

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const { data } = await axios.get('http://localhost:8081/api/v1/auth/booklist');
//         setBooks(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchBooks();
//   }, []);

//   return (
//     <div className="row dashboard">
//       <AdminSidebar />
//       <div className="col-md-9">
//         <h1 className="text-center">All Books</h1>
//         <table className="table">
//           <thead>
//             <tr>
//               <th scope="col">S.no</th>
//               <th scope="col">Book Name</th>
//               <th scope="col">Publisher</th>
//               <th scope="col">Authors</th>
              
//               <th scope="col">Issued To</th>
//               <th scope="col">Issued Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {books.map((book, i) => (
//               <tr key={i}>
//                 <td>{i + 1}</td>
//                 <td>{book.bookname}</td>
//                 <td>{book.publisher}</td>
//                 <td>{book.authors}</td>
               
//                 <td>{book.fname}</td>
//                 <td>{book.issuedDate}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default BooksList;

// import { useState, useEffect } from 'react';
// import AdminSidebar from '../Admin/AdminSidebar';

// function BookList() {
//   const [bookList, setBookList] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:8081/api/v1/auth/booklist')
//       .then(res => res.json())
//       .then(data => setBookList(data.data))
//       .catch(error => console.log(error));
//   }, []);

//   return (
//     <div>
//     <AdminSidebar/>
//       <h1>Book List</h1>
     
//         {bookList.map((book, index) => (
//           <ul>
//           <li key={index}>{book.fname} </li>
//           <li> {book.bookname}</li>
//           </ul>
//         ))}
     
//     </div>
//   );
// }

// export default BookList;
import { useState, useEffect } from 'react';
import AdminSidebar from '../Admin/AdminSidebar';
import Table from 'react-bootstrap/Table';
import { Select } from "antd";
const { Option } = Select;
function BookList() {
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

  return (
    <div>
      <AdminSidebar/>
      <h1 className='text-center'>Book List</h1>
      
      <div className='tablecontainer-center'>
          <div className="table-responsive">
            <Table striped bordered hover variant="dark">
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

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import AdminMenu from "../../components/Layout/AdminMenu";
// import Layout from "../../components/Layout/Layout";
// import { useAuth } from "../../context/auth";
// import moment from "moment";
// import { Select } from "antd";
// const { Option } = Select;

// const AdminOrders = () => {
//   const [status, setStatus] = useState([
//     "Not Process",
//     "Processing",
//     "Shipped",
//     "deliverd",
//     "cancel",
//   ]);
//   const [changeStatus, setCHangeStatus] = useState("");
//   const [orders, setOrders] = useState([]);
//   const [auth, setAuth] = useAuth();
//   const getOrders = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/auth/all-orders");
//       setOrders(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (auth?.token) getOrders();
//   }, [auth?.token]);

//   const handleChange = async (orderId, value) => {
//     try {
//       const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
//         status: value,
//       });
//       getOrders();
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <Layout title={"All Orders Data"}>
//       <div className="row dashboard">
//         <div className="col-md-3">
//           <AdminMenu />
//         </div>
//         <div className="col-md-9">
//           <h1 className="text-center">All Orders</h1>
//           {orders?.map((o, i) => {
//             return (
//               <div className="border shadow">
//                 <table className="table">
//                   <thead>
//                     <tr>
//                       <th scope="col">#</th>
//                       <th scope="col">Status</th>
//                       <th scope="col">Buyer</th>
//                       <th scope="col"> date</th>
//                       <th scope="col">Payment</th>
//                       <th scope="col">Quantity</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td>{i + 1}</td>
//                       <td>
//                         <Select
//                           bordered={false}
//                           onChange={(value) => handleChange(o._id, value)}
//                           defaultValue={o?.status}
//                         >
//                           {status.map((s, i) => (
//                             <Option key={i} value={s}>
//                               {s}
//                             </Option>
//                           ))}
//                         </Select>
//                       </td>
//                       <td>{o?.buyer?.name}</td>
//                       <td>{moment(o?.createAt).fromNow()}</td>
//                       <td>{o?.payment.success ? "Success" : "Failed"}</td>
//                       <td>{o?.products?.length}</td>
//                     </tr>
//                   </tbody>
//                 </table>
//                 <div className="container">
//                   {o?.products?.map((p, i) => (
//                     <div className="row mb-2 p-3 card flex-row" key={p._id}>
//                       <div className="col-md-4">
//                         <img
//                           src={`/api/v1/product/product-photo/${p._id}`}
//                           className="card-img-top"
//                           alt={p.name}
//                           width="100px"
//                           height={"100px"}
//                         />
//                       </div>
//                       <div className="col-md-8">
//                         <p>{p.name}</p>
//                         <p>{p.description.substring(0, 30)}</p>
//                         <p>Price : {p.price}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default AdminOrders;