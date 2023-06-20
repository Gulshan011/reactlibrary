
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { NavLink} from "react-router-dom";
import { Container, Card, Row, Col, Form } from "react-bootstrap";
import lock from "../../images/lock.jpeg"
const ForgotPasssword = () => {
  const [email, setEmail] = useState("");

  
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8081/api/v1/auth/reset-password", {
        email,
        
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
                  src={lock}
                  alt="Sample photo"
                  className="rounded-start"
                  fluid
                />
              </Col>
              <Col md="6">
                <Card.Body className="text-black d-flex flex-column justify-content-center">
                  <h3 className="mb-5 text-uppercase fw-bold">
                    RESET🔐!!!
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
                   
                    <div className="form-group form-button">
                      <input
                        type="submit"
                        name="signup"
                        id="signup"
                        className="form-submit"
                        value="Reset"
                      />

                     
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


