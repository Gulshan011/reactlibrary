
import React from "react";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import imagepic from "../../../images/girl.jpg";
import imagenew from "../../../images/boy.jpg";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

 import './Widgets.css'
import { AreaChart, CartesianGrid, XAxis, Area , Tooltip,
  ResponsiveContainer,} from 'recharts';

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
const data = [
  { name: "January", Total: 1200 },
  { name: "February", Total: 2100 },
  { name: "March", Total: 800 },
  { name: "April", Total: 1600 },
  { name: "May", Total: 900 },
  { name: "June", Total: 1700 },
];
const Featured = () => {
  const{auth,setAuth}=useContext(AuthContext);
  return (
    <div className="row">
    <div class="form-group col-xl-6">
      <div className="Widget">
      <Col md="8" sm-21 >
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
            Do not be scared of the truth because we need to restart the
            human foundation in truth And I love you like Kanye loves
            Kanye I love Rick Owens’ bed design but the back is...
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
  </div>
  <div class="form-group col-xl-6">
  <div className="chart">
       <div className="title">Last Six months desc</div>
      <ResponsiveContainer width="100%" height="80%"aspect={2/1}>
        <AreaChart
          width={700}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="purple" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>


</div>
    </div>
  
  );
};

export default Featured;
