import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from "../user/Sidebar";
import AdminSidebar from "../Admin/AdminSidebar";
import imagepic from "../../images/girl.jpg";
import imagenew from "../../images/boy.jpg";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.js";
import { toast } from "react-toastify";

function About() {
  const { auth, setAuth } = useContext(AuthContext);

  const [photo, setPhoto] = useState("");
  const [formValues, setFormValues] = useState({
    fname: "",
    lname: "",
    regnumber: "",
    bio: "",
    address: "",
    email: auth.user && auth.user.email,
  });

  useEffect(() => {
    if (auth.user) {
      setFormValues((prevValues) => ({
        ...prevValues,
        fname: auth.user.fname,
        lname: auth.user.lname,
        regnumber: auth.user.regnumber,
        bio: auth.user.bio,
        address: auth.user.address,
      }));
    }
  }, [auth.user]);

  const handleFormUpdate = async (e) => {
    e.preventDefault();
    const { fname, lname, bio, address, email, photo } = formValues;

    try {
      const response = await axios.put(
        "http://localhost:8081/api/v1/auth/updateprofile",
        {
          fname,
          lname,
          bio,
          address,
          email,
        }
      );

      const { success, message } = response.data;

      if (success) {
        setAuth((prevAuth) => ({
          ...prevAuth,
          user: {
            ...prevAuth.user,
            fname,
            lname,
            bio,
          },
        }));

        setFormValues((prevValues) => ({
          ...prevValues,
          fname,
          lname,
          bio,
        }));

        Swal.fire({
          title: "Success!",
          text: message,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <>
      {auth.user && auth.user.role === "1" ? <AdminSidebar /> : <Sidebar />}

      <div className="about-page">
        <div className="content">
          <Row>
            <Col md="8">
              <div className="about-card">
                <form onSubmit={handleFormUpdate} className="form-card">
                  <CardHeader>
                    <h5 className="title" style={{ color: "white" }}>
                      Edit Profile
                    </h5>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col className="pr-md-1" md="5">
                          <FormGroup>
                            <label>Department (disabled)</label>
                            <Input
                              defaultValue={auth.user && auth.user.dept}
                              disabled
                              placeholder="Department"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="px-md-1" md="3">
                          <FormGroup>
                            <label>Reg number</label>
                            <Input
                              defaultValue={auth.user && auth.user.regnumber}
                              placeholder="Reg number"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="4">
                          <FormGroup>
                            <label htmlFor="exampleInputEmail1">
                              Email address
                            </label>
                            <Input
                              defaultValue={auth.user && auth.user.email}
                              type="email"
                              onChange={handleInputChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-md-1" md="6">
                          <FormGroup>
                            <label>First Name</label>
                            <Input
                              name="fname"
                              value={formValues.fname}
                              onChange={handleInputChange}
                              placeholder="First Name"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="6">
                          <FormGroup>
                            <label>Last Name</label>
                            <Input
                              name="lname"
                              value={formValues.lname}
                              onChange={handleInputChange}
                              placeholder="Last Name"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label>Address</label>
                            <Input
                              name="address"
                              value={formValues.address}
                              onChange={handleInputChange}
                              placeholder="Home Address"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label>About Me</label>
                            <Input
                              name="bio"
                              value={formValues.bio}
                              defaultValue={auth.user && auth.user.email}
                              onChange={handleInputChange}
                              cols="80"
                              placeholder="Here can be your description"
                              rows="4"
                              type="textarea"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                  <CardFooter>
                    <Button
                      className="btn-fill"
                      color="primary"
                      type="submit"
                    >
                      Save
                    </Button>
                  </CardFooter>
                </form>
              </div>
            </Col>
            <Col md="4">
              <div className="aboutcard-user">
                <CardBody>
                  <CardText />
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        src={
                          auth.user && auth.user.gender === "M"
                            ? imagenew
                            : imagepic
                        }
                        alt="profile"
                        className="profile-image img-fluid" // Added img-fluid class here
                      />
                      <h5 className="title" style={{ color: "white" }}>
                        {auth.user && auth.user.fname}
                      </h5>
                    </a>
                    <p className="description" style={{ color: "white" }}>
                      {auth.user && auth.user.dept}
                    </p>
                  </div>
                  <div
                    className="card-description"
                    style={{ color: "white" }}
                  >
                    {auth.user && auth.user.bio}
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="button-container">
                    <Button className="btn-icon btn-round" color="facebook">
                      <i className="fab fa-facebook" />
                    </Button>
                    <Button className="btn-icon btn-round" color="twitter">
                      <i className="fab fa-twitter" />
                    </Button>
                    <Button className="btn-icon btn-round" color="google">
                      <i className="fab fa-google-plus" />
                    </Button>
                  </div>
                </CardFooter>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default About;
