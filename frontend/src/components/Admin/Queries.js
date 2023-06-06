

// import React, { useState, useEffect } from "react";
// import AdminSidebar from "../Admin/AdminSidebar";
// import Table from "react-bootstrap/Table";
// import axios from "axios";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import Form from "react-bootstrap/Form";
// function Queries() {
//     const [userList, setUserList] = useState([]);
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [replyMessage, setReplyMessage] = useState("");
//     const [showModal, setShowModal] = useState(false);
  
//     useEffect(() => {
//       fetch("http://localhost:8081/api/v1/auth/querylist")
//         .then((res) => res.json())
//         .then((data) => setUserList(data.data))
//         .catch((error) => console.log(error));
//     }, []);
  
//     const handleReply = (user) => {
//       setSelectedUser(user);
//       setReplyMessage("");
//       setShowModal(true);
//     };
  
//     const handleSendMessage = async (e) => {
//           e.preventDefault();
//           try {
//             const response = await axios.post("/sendEmail", {
//               mailerState: {
//                 email: mailerState.email,
//                 message: mailerState.message,
//               },
//             });
//             const { status } = response.data;
//             if (status === "success") {
//               alert("Message Sent");
//             } else {
//               alert("Message failed to send");
//             }
//             setMailerState({
//               name: "",
//               email: "",
//               message: "",
//             });
//           } catch (error) {
//             console.error(error);
//             alert("An error occurred while sending the message");
//           }
//         };
    
  
//     return (
//       <div>
//         <AdminSidebar />
//         <br />
//         <div className="tablecontainer-center">
//           <div className="table-responsive">
//             <Table striped bordered hover variant="light">
//               <thead>
//                 <tr>
//                   <th>FirstName</th>
//                   <th>Email</th>
//                   <th>Query</th>
//                   <th>Reply to a query</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {userList.map((user, index) => (
//                   <tr key={index}>
//                     <td>{user.fname}</td>
//                     <td>{user.email}</td>
//                     <td>{user.query}</td>
//                     <td>
//                       <Button onClick={() => handleReply(user)}>
//                         Reply
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           </div>
//         </div>
//         <Modal show={showModal} onHide={() => setShowModal(false)}>
//           <Modal.Header closeButton>
//             <Modal.Title>Reply to Query</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form.Group>
//               <Form.Label>User: {selectedUser?.fname}</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={4}
//                 value={replyMessage}
//                 onChange={(e) => setReplyMessage(e.target.value)}
//               />
//             </Form.Group>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={() => setShowModal(false)}>
//               Cancel
//             </Button>
//             <Button variant="primary" onClick={handleSendMessage}>
//               Send
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </div>
//     );
//   }
  
//   export default Queries;
  
import React, { useState, useEffect } from "react";
import AdminSidebar from "../Admin/AdminSidebar";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function Queries() {
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8081/api/v1/auth/querylist")
      .then((res) => res.json())
      .then((data) => setUserList(data.data))
      .catch((error) => console.log(error));
  }, []);

  const handleReply = (user) => {
    setSelectedUser(user);
    setReplyMessage("");
    setShowModal(true);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/sendEmail", {
        mailerState: {
          email: selectedUser.email,
          message: replyMessage,
        },
      });
      const { status } = response.data;
      if (status === "success") {
        alert("Message Sent");
      } else {
        alert("Message failed to send");
      }
      setReplyMessage("");
      setShowModal(false);
    } catch (error) {
      console.error(error);
      alert("An error occurred while sending the message");
    }
  };

  return (
    <div>
      <AdminSidebar />
      <br />
      <div className="tablecontainer-center">
        <div className="table-responsive">
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>FirstName</th>
                <th>Email</th>
                <th>Query</th>
                <th>Reply to a query</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user, index) => (
                <tr key={index}>
                  <td>{user.fname}</td>
                  <td>{user.email}</td>
                  <td>{user.query}</td>
                  <td>
                    <Button onClick={() => handleReply(user)}>Reply</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reply to Query</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>User: {selectedUser?.fname}</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSendMessage}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Queries;
