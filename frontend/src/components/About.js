import React ,{useState} from "react";
import imagepic from "../images/girl.jpg";
import imagenew from "../images/boy.jpg";
import{useContext,AuthContext}from "../context/auth.js";
import {useNavigate } from "react-router-dom";
import Sidebar from "../../src/components/user/Sidebar";
import AdminSidebar from "./Admin/AdminSidebar";
import '../App.css'
const About = () => {
  const [photo, setPhoto] = useState("");
  const{auth,setAuth}=useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div>
    {auth.user && auth.user.role==="1"?<AdminSidebar/>:<Sidebar/>}
      <div className="parent-container">
        <div className="containers emp-profile">
          <form method="GET">
            <div className="row">
              <div className="col-md-4">
                <img src={auth.user && auth.user.gender==="M"?imagenew :imagepic} alt="image" />
              </div>

              <div className="col-md-6">
                <div className="profile-head">
                  <h5>{auth.user && auth.user.fname}</h5>
                  <h6>student</h6>
                  <p className="profile-rating mt-3 mb-5">
                    RANKINGS<span>2/5</span>
                  </p>
                  </div>
                  <div className="form-group form-button">
                 <input
                    type="button"
                    
                    className="profile-edit-btn"
                    name="btnAddMore"
                    value="Edit Profile"
                    onClick={() => {
                      navigate("/edit");
                    }}
                  ></input>
               </div></div>
              
               </div>
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        id="home-tab"
                        data-toggle="tab"
                        href="#home"
                        role="tab"
                      >
                        About
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="profile-tab"
                        data-toggle="tab"
                        href="#profile"
                        role="tab"
                      >
                      Description
                      </a>
                    </li>
                  </ul>
              
           
             
          
            

                <div className="col-md-8 pl-5 about-info">
                  <div className="tab-content profile-tab" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="home"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                    >
                      <div className="row">
                        <div className="col-md-6">
                          <label>Registeration Number</label>
                        </div>
                        <div className="col-md-6">
                          <p>{auth.user && auth.user.regnumber}</p>
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="col-md-6">
                          <label>First Name</label>
                        </div>
                        <div className="col-md-6">
                          <p>{auth.user && auth.user.fname}</p>
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="col-md-6">
                          <label>Last Name</label>
                        </div>
                        <div className="col-md-6">
                          <p>{auth.user && auth.user.lname}</p>
                        </div>
                      </div>

                      <div className="row mt-3">
                      <div className="col-md-6">
                        <label>Gender</label>
                      </div>
                      <div className="col-md-6">
                        <p>{auth.user && auth.user.gender}</p>
                      </div>
                    </div>

                      <div className="row mt-3">
                        <div className="col-md-6">
                          <label>Role</label>
                        </div>
                        <div className="col-md-6">
                          <p>{auth.user && auth.user.role}</p>
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="col-md-6">
                          <label>Department</label>
                        </div>
                        <div className="col-md-6">
                          <p>{auth.user && auth.user.dept}</p>
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="col-md-6">
                          <label>Email</label>
                        </div>
                        <div className="col-md-6">
                          <p>{auth.user && auth.user.email}</p>
                        </div>
                      </div>
                    </div>
                
                <div
                  className="tab-pane fade "
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label>User ID</label>
                    </div>
                    <div className="col-md-6">
                      <p>677900</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>First Name</label>
                    </div>
                    <div className="col-md-6">
                      <p>xxxx</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label> Name</label>
                    </div>
                    <div className="col-md-6">
                      <p>xxxx</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>First Name</label>
                    </div>
                    <div className="col-md-6">
                      <p>xxxx</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>First Name</label>
                    </div>
                    <div className="col-md-6">
                      <p>xxxx</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>First Name</label>
                    </div>
                    <div className="col-md-6">
                      <p>xxxx</p>
                    </div>
                  </div>
                  
                  </div>
                  </div>
                </div>
          
          
          </form>
        </div>
      </div>
    </div>
  );
};

export default About;
