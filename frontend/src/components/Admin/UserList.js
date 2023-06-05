

import { useState, useEffect } from "react";
import AdminSidebar from "../Admin/AdminSidebar";
import Table from "react-bootstrap/Table";





function UserList() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/api/v1/auth/userdata')
      .then(res => res.json())
      .then(data => setUserList(data.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <AdminSidebar />
      <br></br>
      <div className="tablecontainer-center">
        <div className="table-responsive">
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Email</th>
                <th>Reg.number</th>
                <th>Role</th>
                <th>Department</th>
                
                
              </tr>
            </thead>
            <tbody>
              {userList.map((user, index) => (
                <tr key={index}>
                  <td>{user.fname}</td>
                  <td>{user.lname}</td>
                  <td>{user.email}</td>
                  <td>{user.regnumber}</td>
                  <td>{user.role}</td>
                  <td>{user.dept}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default UserList;


