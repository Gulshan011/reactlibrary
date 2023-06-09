
  
import React, { useState, useEffect } from "react";
import AdminSidebar from "../Admin/AdminSidebar";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
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
      const res = await axios.post("http://localhost:8081/api/v1/auth/send-email", {
         
          email: selectedUser.email,
          message: replyMessage,
        
      });
      if (res && res.data.success) {
        Swal.fire({
          title: "Success!",
          text: res.data.message,
          icon: "success",
          timer: 2000,
          width: 600,
          padding: '3em',
          color: '#716add',
          background: '#fff url(/images/trees.png)',
          backdrop: `
            rgba(0,0,123,0.4)
            url(https://media.tenor.com/aJumv0mMceoAAAAi/cheer-cheering.gif)
            left top
            no-repeat
          `,
          showConfirmButton: false,
         
        });
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
        });
      }
    } catch (error) {
      console.log(error);
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
      });
    }
  }
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
