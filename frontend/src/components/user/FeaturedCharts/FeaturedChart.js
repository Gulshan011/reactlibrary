
import React, { useEffect, useState } from 'react';
import { useContext, AuthContext } from "../../../context/auth";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from 'reactstrap';


const Featured = () => {
    const { auth } = useContext(AuthContext);
const email = auth.user && auth.user.email; 
  const [taskList, setTaskList] = useState([]);
  const [formValues, setFormValues] = useState({
    title: "",
    start: "",
    end: "",
    email:auth.user && auth.user.email
  });

  useEffect(() => {
    fetch(`http://localhost:8081/api/v1/auth/usertasks/${email}`)
      .then((res) => res.json())
      .then((data) => setTaskList(data.data.slice(0, 5)))
      .catch((error) => console.log(error));
  }, [email]);

  return (
    <div className="featured">
      <CardBody>
        <div className="table-full-width table-responsive">
          <Table>
            <tbody>
              {taskList.map((task, index) => (
                <tr key={index} style={{ height: '10vh', fontStyle: 'inherit' }}>
                  <td>
                    <FormGroup check>
                      <Label check>
                        <Input defaultValue="" type="checkbox" />
                        <span className="form-check-sign">
                          <span className="check" />
                        </span>
                      </Label>
                    </FormGroup>
                  </td>
                  <td>
                    <p className="featured-title" style={{ fontWeight:"300px" , fontStyle: "italic" }}>{task.title}</p>
                    <p className="text-small" style={{ fontStyle: 'italic' }}>
                      {task.start}
                     
                    </p>
                    <p className="text-small" style={{ fontStyle: 'italic' }}>
                
                    {task.description}
                  </p>
                  </td>
                  <td className="td-actions text-right">
                  <Button color="link" id={`tooltip${index}`} title="" type="button" style={{ color: 'white' }}>
                  <FaIcons.FaPen />
                </Button>
                
                <UncontrolledTooltip delay={0} target={`tooltip${index}`} placement="right-end" style={{ color: 'white' }}>
                Edit Task
              </UncontrolledTooltip>
              
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </CardBody>
    </div>
  );
};

export default Featured;
