import React from 'react'

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import {CircularProgressbar}from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"
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
  UncontrolledTooltip
} from "reactstrap";
const Featured = () => {
  return (
  
    <div className='featured'>
    <CardBody>

    <div className="table-full-width table-responsive">
      <Table>
        <tbody>
          <tr style={{ height: "10vh" , fontStyle:"inherit" }}>
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
              <p className="featured-title">Update the Documentation</p>
              <p className="text-small" style={{fontStyle:"italic"}}>
                Dwuamish Head, Seattle, WA 8:47 AM
              </p>
            </td>
            <td className="td-actions text-right">
              <Button
                color="link"
                id="tooltip636901683"
                title=""
                type="button"
              >
                <i className="FaIcons.FaHistory " />
              </Button>
              <UncontrolledTooltip
                delay={0}
                target="tooltip636901683"
                placement="right"
              >
                Edit Task
              </UncontrolledTooltip>
            </td>
          </tr>
          <tr style={{ height: "10vh" , fontStyle:"inherit" }} >
            <td>
              <FormGroup check>
                <Label check>
                  <Input
                    defaultChecked
                    defaultValue=""
                    type="checkbox"
                  />
                  <span className="form-check-sign">
                    <span className="check" />
                  </span>
                </Label>
              </FormGroup>
            </td>
            <td>
              <p className="featured-title">GDPR Compliance</p>
              <p className="text-small"style={{fontStyle:"italic",color:"cyan"}}>
                The GDPR is a regulation that requires businesses to
               
              </p>
            </td>
            <td className="td-actions text-right">
              <Button
                color="link"
                id="tooltip457194718"
                title=""
                type="button"
              >
                <i className="tim-icons icon-pencil" />
              </Button>
              <UncontrolledTooltip
                delay={0}
                target="tooltip457194718"
                placement="right"
              >
                Edit Task
              </UncontrolledTooltip>
            </td>
          </tr>
          <tr style={{ height: "10vh" , fontStyle:"inherit" }}>
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
              <p className="featured-title">Solve the issues</p>
              <p className="text-small"style={{fontStyle:"italic"}}>
                Fifty percent of all respondents said they would be
                more likely to shop at a company
              </p>
            </td>
            <td className="td-actions text-right">
              <Button
                color="link"
                id="tooltip362404923"
                title=""
                type="button"
              >
                <i className="tim-icons icon-pencil" />
              </Button>
              <UncontrolledTooltip
                delay={0}
                target="tooltip362404923"
                placement="right"
              >
                Edit Task
              </UncontrolledTooltip>
            </td>
          </tr>
          <tr style={{ height: "10vh" , fontStyle:"inherit" }}>
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
              <p className="featured-title">Release v2.0.0</p>
              <p className="text-small"style={{fontStyle:"italic"}}>
                Ra Ave SW, Seattle, WA 98116, SUA 11:19 AM
              </p>
            </td>
            <td className="td-actions text-right">
              <Button
                color="link"
                id="tooltip818217463"
                title=""
                type="button"
              >
                <i className="tim-icons icon-pencil" />
              </Button>
              <UncontrolledTooltip
                delay={0}
                target="tooltip818217463"
                placement="right"
              >
                Edit Task
              </UncontrolledTooltip>
            </td>
          </tr>
          <tr style={{ height: "10vh" , fontStyle:"inherit" }}> 
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
              <p className="featured-title">Export the processed files</p>
              <p className="text-small"style={{fontStyle:"italic"}}>
                The report also shows that consumers will not easily
                forgive a company once a breach exposing their
                personal data occurs.
              </p>
            </td>
            <td className="td-actions text-right">
              <Button
                color="link"
                id="tooltip831835125"
                title=""
                type="button"
              >
                <i className="tim-icons icon-pencil" />
              </Button>
              <UncontrolledTooltip
                delay={0}
                target="tooltip831835125"
                placement="right"
              >
                Edit Task
              </UncontrolledTooltip>
            </td>
          </tr>
          <tr style={{ height: "10vh" , fontStyle:"inherit" }}>
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
              <p className="featured-title">Arival at export process</p>
              <p className="text-small"style={{fontStyle:"italic"}}>
                Capitol Hill, Seattle, WA 12:34 AM
              </p>
            </td>
            <td className="td-actions text-right">
              <Button
                color="link"
                id="tooltip217595172"
                title=""
                type="button"
              >
                <i className="tim-icons icon-pencil" />
              </Button>
              <UncontrolledTooltip
                delay={0}
                target="tooltip217595172"
                placement="right"
              >
                Edit Task
              </UncontrolledTooltip>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  </CardBody>
  </div>
  )
}

export default Featured