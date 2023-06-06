
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { NavLink} from "react-router-dom";
import { Container, Card, Row, Col, Form } from "react-bootstrap";

const ForgotPasssword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8081/api/v1/auth/forgot-password", {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
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
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
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

export default ForgotPasssword ;


