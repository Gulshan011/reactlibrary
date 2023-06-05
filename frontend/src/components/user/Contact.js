import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Swal from "sweetalert2";  
import { toast } from "react-toastify";
import { useContext, AuthContext } from "../../context/auth.js";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import * as FaIcons from "react-icons/fa";

export const Contact = () => {
 
  const [query, setQuery] = useState("");
  
  const { auth, setAuth } = useContext(AuthContext);


  const navigate = useNavigate();


  const handleSubmit = async (e) => {

    e.preventDefault();
    console.log("query",query);
    try {
      const res = await axios.post(
        `http://localhost:8081/api/v1/auth/query`, 
     {fname: auth.user && auth.user.fname, email:auth.user && auth.user.email,query
      });
       if (res && res.data.success) {
        Swal.fire({
          title: "Success!",
          text: res.data.message,
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
          didClose: () => {
           
            navigate("/Home");
          },
        });
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
        <div className="container-fluid">
        
          <div className="row">
          <form
        method="POST"
        className="contact-form"
        id="contact-form"
        onSubmit={handleSubmit}
      >
            <div className="col-lg-10 offser-lg-1 d-flex justify-content-between">
              <div className="contact_info_item d_flex justify-content-start">
                <div className="contact_info_content">
                  <FaIcons.FaPhone></FaIcons.FaPhone>
                  <div className="contact_info_title">FirstName</div>
                  <div className="contact_info_text">
                    {auth.user && auth.user.fname}
                  </div>
                </div>
                <div className="contact_info_item d_flex justify-content-start">
                  <div className="contact_info_content">
                    <FaIcons.FaEnvelope></FaIcons.FaEnvelope>
                    <div className="contact_info_title">Email</div>
                    <div className="contact_info_text">
                      {auth.user && auth.user.email}
                    </div>
                  </div>
                  <div className="contact_info_item d_flex justify-content-start">
                    <div className="contact_info_content">
                      <FaIcons.FaIdCard></FaIcons.FaIdCard>
                      <div className="contact_info_title">
                       {auth.user && auth.user.regnumber}
                      </div>
                      <div className="contact_info_text">01</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact_form">
              <div className="containers overflow-hidden">
                <div className="row gx-5">
                  <div className="col-lg-10 offset-lg-1">
                    <div className="contact_form_container py-5">
                      <div className="contact_form_title"><b>Get in Touch </b></div>
                     
                      <div className="row ">
                      
                       <div className="col-4">
                          <input
                            type="text"
                            id="contact_form_name"
                            className="contact_form_name input_field"
                            value={auth.user && auth.user.fname}
                           
                            placeholder="Yourname"
                            required="true"
                          />
                        </div>
                       
                         <div className="col-4">
                        <input
                          type="text"
                          id="contact_form_email"
                          className="contact_form_name input_field"
                          value={auth.user && auth.user.email}
                          
                          placeholder="Youremail"
                          required="true"
                        /> </div>
                         <div className="col-4">
                         <input
                          type="text"
                          id="contact_form_id"
                          className="contact_form_name input_field"
                          value={auth.user && auth.user.regnumber}
                          
                          placeholder="Your Reg.Id"
                          required="true"
                        />
                        </div>
                      </div>
                      </div>

                      <div className="form-group">
                      <div className="col-md-12">
                          <textarea
                            className="text_field contact_form_message"
                            id="query"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            
                            placeholder="Query"
                            cols="30"
                            rows="10"
                          ></textarea>
                        </div>
                      </div>

                      <div className="contact_form_button">
                        <button type="submit" onSubmit={handleSubmit}>
                          Send Message
                        </button>
                      </div>
                     
                    </div>
                  </div>
                </div>
                
              </div>
           
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Contact;
// import React, { useState } from "react";
// import Sidebar from "./Sidebar";
// import Swal from "sweetalert2";
// import { toast } from "react-toastify";
// import { useContext, AuthContext } from "../../context/auth.js";
// import { useNavigate, NavLink } from "react-router-dom";
// import axios from "axios";
// import * as FaIcons from "react-icons/fa";

// export const Contact = () => {
//   const [query, setQuery] = useState("");
//   const { auth, setAuth } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("query", query);
//     try {
//       const res = await axios.post(
//         `http://localhost:8081/api/v1/auth/query`,
//         {
//           fname: auth.user && auth.user.fname,
//           email: auth.user && auth.user.email,
//           query,
//         }
//       );
//       if (res && res.data.success) {
//         Swal.fire({
//           title: "Success!",
//           text: res.data.message,
//           icon: "success",
//           timer: 1000,
//           showConfirmButton: false,
//           didClose: () => {
//             navigate("/Home");
//           },
//         });
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong");
//     }
//   };

//   return (
//     <div>
//       <Sidebar />
//       <div className="contact_info">
//         <div className="container-fluid">
//           <div className="row">
//             <form
//               method="POST"
//               className="contact-form"
//               id="contact-form"
//               onSubmit={handleSubmit}
//             >
//             <div className="col-lg-10 offser-lg-1 d-flex justify-content-between">
//                          <div className="contact_info_item d_flex justify-content-start">
//                            <div className="contact_info_content">
//                              <FaIcons.FaPhone></FaIcons.FaPhone>
//                              <div className="contact_info_title">FirstName</div>
//                              <div className="contact_info_text">
//                                {auth.user && auth.user.fname}
//                              </div>
//                            </div>
//                            <div className="contact_info_item d_flex justify-content-start">
//                              <div className="contact_info_content">
//                                <FaIcons.FaEnvelope></FaIcons.FaEnvelope>
//                                <div className="contact_info_title">Email</div>
//                                <div className="contact_info_text">
//                                  {auth.user && auth.user.email}
//                                </div>
//                              </div>
//                              <div className="contact_info_item d_flex justify-content-start">
//                                <div className="contact_info_content">
//                                  <FaIcons.FaIdCard></FaIcons.FaIdCard>
//                                  <div className="contact_info_title">
//                                   {auth.user && auth.user.regnumber}
//                                  </div>
//                                  <div className="contact_info_text">01</div>
//                                </div>
//                              </div>
//                            </div>
//                          </div>
//                        </div>

//               <div className="col-lg-10 offset-lg-1">
//                 <div className="contact_form_container py-5">
//                   <div className="contact_form_title">
//                     <b>Get in Touch</b>
//                   </div>

//                   <div className="form-group">
//                     <div className="row">
//                       <div className="col-4">
//                         <input
//                           type="text"
//                           id="contact_form_name"
//                           className="input_field form-control"
//                           value={auth.user && auth.user.fname}
//                           placeholder="Your Name"
//                           required
//                           disabled
//                         />
//                       </div>

//                       <div className="col-4">
//                         <input
//                           type="text"
//                           id="contact_form_email"
//                           className="input_field form-control"
//                           value={auth.user && auth.user.email}
//                           placeholder="Your Email"
//                           required
//                           disabled
//                         />
//                       </div>

//                       <div className="col-4">
//                         <input
//                           type="text"
//                           id="contact_form_id"
//                           className="input_field form-control"
//                           value={auth.user && auth.user.regnumber}
//                           placeholder="Your Reg. ID"
//                           required
//                           disabled
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="form-group">
//                     <div className="row">
//                       <div className="col-md-12">
//                         <textarea
//                           className="text_field contact_form_message form-control"
//                           id="query"
//                           value={query}
//                           onChange={(e) => setQuery(e.target.value)}
//                           placeholder="Query"
//                           rows="10"
//                           required
//                         ></textarea>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="contact_form_button">
//                     <button type="submit" className="btn btn-primary">
//                       Send Message
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;
