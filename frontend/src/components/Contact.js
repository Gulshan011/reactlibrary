import React ,{useState} from "react";
import Sidebar from "../user/Sidebar";
import { toast } from "react-toastify";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import * as FaIcons from "react-icons/fa";
export const Contact = () => {
    const [fname, setFname] = useState("");
    const [email, setEmail] = useState("");
    const [regnumber, setRegnumber] = useState("");
    const[query,setQuery]=useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post(
            `http://localhost:8081/api/v1/auth/query`,
            { fname, email,regnumber, query}
          );
          if (res && res.data.success) {
            toast.success(res.data && res.data.message);
            
           
          } else {
            toast.error(res.data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }
      };
 
 
    return (
    <div>
      <Sidebar />
      <div className="contact_info">
      <form method="POST" className="contact-form" id="contact-form"
              onSubmit={handleSubmit}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-10 offser-lg-1 d-flex justify-content-between">
              <div className="contact_info_item d_flex justify-content-start">
                <div className="contact_info_content">
                  <FaIcons.FaPhone></FaIcons.FaPhone>
                  <div className="contact_info_title">FirstName</div>
                  <div className="contact_info_text">{fname}</div>
                </div>
                <div className="contact_info_item d_flex justify-content-start">
                  <div className="contact_info_content">
                    <FaIcons.FaEnvelope></FaIcons.FaEnvelope>
                    <div className="contact_info_title">Email</div>
                    <div className="contact_info_text">{email}</div>
                  </div>
                  <div className="contact_info_item d_flex justify-content-start">
                    <div className="contact_info_content">
                      <FaIcons.FaIdCard></FaIcons.FaIdCard>
                      <div className="contact_info_title">
                       {regnumber}
                      </div>
                      <div className="contact_info_text">01</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact_form">
              <div className="container">
                <div className="row">
                  <div className="col-lg-10 offset-lg-1">
                  <div className="contact_form_container py-5">
                    <div className="contact_form_title">Get in Touch </div>
                    <form id="contact_form">
                    <div className="form-group">
                      <div className="contact_form_name d-flex justify-content-between align-items-between">
                        <input
                          type="text"
                          id="contact_form_name"
                          className="contact_form_name input_field"
                          value={fname}
                          placeholder="Yourname"
                          required="true"
                        />
                        </div>
                       </div>
                       <div className="form-group">
                        <input
                          type="text"
                          id="contact_form_email"
                          className="contact_form_name input_field"
                          value={email}
                          placeholder="Youremail"
                          required="true"
                        />
                        </div>
                        <div className="form-group">
                        <input
                          type="text"
                          id="contact_form_id"
                          className="contact_form_name input_field"
                          value={regnumber}
                          placeholder="Your Reg.Id"
                          required="true"
                        />
                       </div>
                       <div className="form-group">
                       <div className="contact_form_text mt-2 ml-3">
                          <textarea
                            className="text_field contact_form_message"
                            id="query"
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Query"
                            cols="30"
                            rows="10"
                          ></textarea>
                        </div>
                        </div>
                     

                        <div className="contact_form_button">
                          <button type="submit">Send Message</button>
                        </div>
                   
                      
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
        </form>
      </div>
      
    </div>
  );
};

export default Contact;
