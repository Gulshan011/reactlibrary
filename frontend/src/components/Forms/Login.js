import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useContext, AuthContext, useAuth } from "../../context/auth.js";
import axios from "axios";
import { Container, Card, Row, Col, Form } from "react-bootstrap";
import loginimage from '../../images/loginppic.jpeg'
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useContext(AuthContext);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8081/api/v1/auth/login`, {
        email,
        password,
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
          didClose: () => {
            setAuth({
              user: res.data.user.fname,
              token: res.data.token,
            });
          
          localStorage.setItem("auth", JSON.stringify(res.data));
                    navigate("/Home");}
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
  };
  

  return (
    <div className="login-page">
      <Container fluid className="new-card-container">
        <Row className="d-flex justify-content-center align-items-center h-100 container-align">
          <Col>
            <div className="new-card">
              <Row className="g-3">
                <Col md="6" className="d-none d-md-block">
                  <Card.Img
                    src= {loginimage}
                    alt="Sample photo"
                    className="rounded-start"
                    fluid
                  />
                </Col>
                <Col md="6">
                  <Card.Body className="text-black d-flex flex-column justify-content-center">
                    <h3 className="mb-5 text-uppercase fw-bold">
                      Login Here!!!
                    </h3>
                    <form
                      onSubmit={handleSubmit}
                      className="register-form"
                      id="register-form"
                    >
                      <Form.Group className="mb-4">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          size="md"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Your email"
                        />
                      </Form.Group>
                      <Form.Group className="mb-4">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          size="md"
                          type="password"
                          placeholder="Enter Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Form.Group>
                      <div className="form-group form-button">
                        <input
                          type="submit"
                          name="signup"
                          id="signup"
                          className="form-submit"
                          value="Login"
                        />

                        <NavLink to="/Signup" className="signup-image-link">
                          Not Registered ? _Register Here!!
                        </NavLink>
                        <NavLink to="/ForgotPassword" className="signup-image-link">
                       ForgotPasssword? Reset!!
                      </NavLink>
                      </div>
                    </form>
                  </Card.Body>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
