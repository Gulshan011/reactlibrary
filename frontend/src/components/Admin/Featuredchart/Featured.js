import React from "react";
import "./featured.css";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import imagepic from "../../../images/girl.jpg";
import imagenew from "../../../images/boy.jpg";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import{useContext,AuthContext}from "../../../context/auth";
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
  Col
} from "reactstrap";
const Featured = () => {
  const{auth,setAuth}=useContext(AuthContext);
  return (
    <div className="featured">
    <Col md="12" sm-21 >
    <div className="card-user">
      <CardBody>
        <CardText />
        <div className="author">
          <div className="block block-one" />
          <div className="block block-two" />
          <div className="block block-three" />
          <div className="block block-four" />
          <a href="#pablo" onClick={(e) => e.preventDefault()}>
            <img
              alt="..."
              className="avatar"
            src={auth.user && auth.user.gender==="M"?imagenew :imagepic}
            />
            <h5 className="title">{auth.user && auth.user.fname}</h5>
          </a>
          <p className="role"style={{color:"white"}}>{auth.user && auth.user.dept}</p>
        </div>
        <div className="card-description" style={{color:"white"}}>
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

    </div>
  );
};

export default Featured;
