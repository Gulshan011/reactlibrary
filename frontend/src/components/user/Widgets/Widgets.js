
import React, { useState, useEffect } from "react";
import { useContext, AuthContext } from "../../../context/auth";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
 import imagepic from "../../../images/girl.jpg";
import imagenew from "../../../images/boy.jpg";
import './Widgets.css';
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
import {
  AreaChart,
  CartesianGrid,
  XAxis,
  Area,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import axios from 'axios';

const Featured = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const fname = auth.user && auth.user.fname; 

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/v1/auth/booklist/${fname}`);
      const json = await response.json();

      // Aggregate data by month
      const monthData = json.data.reduce((acc, issue) => {
        const month = issue.issuedDate.slice(0, 7);
        if (!acc[month]) {
          acc[month] = {
            name: month,
            Total: 0,
          };
        }
        acc[month].Total += 1;
        return acc;
      }, {});

      // Create array of last six months, with 0 values for missing data
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
      const months = Array.from({ length: 6 }, (_, i) => {
        const date = new Date(sixMonthsAgo);
        date.setMonth(date.getMonth() + i);
        return date.toISOString().slice(0, 7);
      });
      const sixMonthData = months.map((month) => monthData[month] || { name: month, Total: 0 });

      setData(sixMonthData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="row">
    <div className="col-xl-6">
    <div className="Widget">
      <div className="new-card">
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
                src={auth.user && auth.user.gender === "M" ? imagenew : imagepic}
              />
              <h5 className="title">{auth.user && auth.user.fname}</h5>
            </a>
            <p className="role" style={{ color: "white" }}>{auth.user && auth.user.dept}</p>
            <div className="card-description" style={{ color: "white" }}>
            {auth.user && auth.user.bio}
          </div>
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
    </div>
  </div>
      <div className="col-xl-6">
        <div className="chart">
          <div className="title">Issued Books</div>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart
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
