import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useContext, AuthContext, useAuth } from "../../context/auth.js";
import axios from "axios";
import { Container, Card, Row, Col, Form } from "react-bootstrap";

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
                    src="data:image/jpeg;base64,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"
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
