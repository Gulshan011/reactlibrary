import React, { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";  
import { Container, Card, Row, Col, Form} from 'react-bootstrap';

import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import './forms.css'
const Signup = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [regnumber, setRegnumber] = useState("");
  const [dept, setDept] = useState("");
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  const [answer, setAnswer] = useState("");
  

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8081/api/v1/auth/register`,
        { fname, lname, email, password, regnumber, role, dept ,gender,answer}
      );
      if (res && res.data.success) {
        Swal.fire({
          title: "Success!",
          text: res.data.message,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
          didClose: () => {
           
            navigate("/Home");
          },
        });
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
    


    <div className="signup-page">
    <Container fluid className=" new-card-container">
        <Row className="d-flex justify-content-center align-items-center h-100 container-align">
    <Col >
    
       

        <div className='new-card'>
       
            <Row className='g-0'>
              <Col md='6' className='d-none d-md-block'>
                <Card.Img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqsibS6krrFtrIbJSzFblxDZD3Fla_c9-GlQ&usqp=CAU' className='rounded-start' fluid />
              </Col>
              <Col md='6'>
                <Card.Body className='text-black d-flex flex-column justify-content-center '>
                  <h3 className='mb-5 text-uppercase fw-bold'>Student registration form</h3>
                  <form method="POST" className="register-form" id="register-form"
                  onSubmit={handleSubmit}>
                  <Row>
                    <Col md='6'>
                      <Form.Group className='mb-4'>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control size='md' type='text' placeholder='First name'  value={fname}
                        onChange={(e) => setFname(e.target.value)}/>
                      </Form.Group>
                    </Col>
                    <Col md='6'>
                      <Form.Group className='mb-4'>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control size='md' type='text' placeholder='Last name'   value={lname}
                        onChange={(e) => setLname(e.target.value)}/>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                  <Col md='6'>
                    <Form.Group className='mb-4'>
                      <Form.Label>Email</Form.Label>
                   
                      <Form.Control size='md' type='text'  placeholder='Enter your email' value={email}
                      onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>
                  </Col>
                  <Col md='6'>
                    <Form.Group className='mb-4'>
                      <Form.Label>Password</Form.Label>
                      <Form.Control size='md' type='text' placeholder=' Enter Password' value={password}
                      onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                  </Col>
                </Row>
                  
                  <Form.Group className='mb-4'>
                    <Form.Label>Registration number</Form.Label>
                    <Form.Control size='md' type='text'  placeholder='Enter registration number'  value={regnumber}
                    onChange={(e) => setRegnumber(e.target.value)}/>
                  </Form.Group>
                  <Form.Group className='mb-4'>
                    <Form.Label>Department</Form.Label>
                    <Form.Control size='md' type='text' placeholder='Enter department'  value={dept}
                    onChange={(e) => setDept(e.target.value)} />
                  </Form.Group>
                  <div className='d-md-flex justify-content-start align-items-center mb-4'>
                  <h6 className='fw-bold mb-0 me-4'>Gender: </h6>
                  <Form.Check inline label='Female' name='inlineRadio' id='inlineRadio1' type='radio'  value='Female'
                  checked={gender === 'Female'}
                  onChange={(e) => setGender(e.target.value)}/>
                  <Form.Check inline label='Male' name='inlineRadio' id='inlineRadio2' type='radio'value='Male'
                  checked={gender === 'Male'}
                  onChange={(e) => setGender(e.target.value)}/>
                  <Form.Check inline label='Other' name='inlineRadio' id='inlineRadio3' type='radio'     value='Other'
                  checked={gender === 'Other'}
                  onChange={(e) => setGender(e.target.value)}
               />
                </div>
               
                <Form.Group className='mb-4'>
                  <Form.Label>Role</Form.Label>
                  <Form.Control size='md' type='text' placeholder=' Enter Role' value={role}
                  onChange={(e) => setRole(e.target.value)}/>
                </Form.Group>
             
              <div className="form-group form-button">
              <input
                type="submit"
                name="signup"
                id="signup"
                className="form-submit"
                value="register"
               
              />
         
                  
                  <NavLink to="/Login" className="signup-image-link">
                  Already have an account? _Login!!
                </NavLink></div>
                </form>
                </Card.Body>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
    </div>





    
    </>
  );
};
export default Signup;
