// import React, { useState } from "react";

// import Swal from "sweetalert2";  
// import { toast } from "react-toastify";
// import { useContext, AuthContext } from "../../context/auth.js";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import * as FaIcons from "react-icons/fa";


// import styled from 'styled-components';
// import { Link } from 'react-router-dom';

// import { motion } from 'framer-motion';
// import * as AiIcons from 'react-icons/ai';
// import { SidebarData } from './SidebarData.js';
// import SubMenu from './SubMenu';
// import { IconContext } from 'react-icons/lib';
// import NotificationComponent from '../user/Messages'; // Import the NotificationComponent
// import EmailComponent from '../user/Emails';
// const Nav = styled.div`
//   background-color: #1e1e2f;
//   height: 80px;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   font-family: "Poppins", sans-serif;
// `;

// const NavIcon = styled(Link)`
//   margin-left: 2rem;
//   font-size: 2rem;
//   height: 80px;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   font-family: "Poppins", sans-serif;
//   background-color: #1e1e2f;
// `;

// const sidebarVariants = {
//   open: {
//     width: '345px',
//     left: '0',
//     transition: {
//       type: 'spring',
//       stiffness: 150,
//       damping: 20,
//     },
//   },
//   closed: {
//     width: '80px',
//     left: '-345px',
//     transition: {
//       type: 'spring',
//       stiffness: 150,
//       damping: 20,
//     },
//   },
// };

// const contentVariants = {
//   open: {
//     marginLeft: '345px',
//     transition: {
//       type: 'spring',
//       stiffness: 150,
//       damping: 20,
//     },
//   },
//   closed: {
//     marginLeft: '0px',
//     transition: {
//       type: 'spring',
//       stiffness: 150,
//       damping: 20,
//     },
//   },
// };

// const SidebarNav = styled(motion.nav)`
//   background-color: #1e1e2f;
//   width: 345px;
//   height: 100vh;
//   display: flex;
//   justify-content: center;
//   position: fixed;
//   top: 0;
//   left: ${({ sidebar }) => (sidebar ? '0' : '-345px')};
//   z-index: 10;
// `;

// const SidebarWrap = styled(motion.div)`
//   width: 100%;
//   flex: 1;
// `;
// export const Contact = () => {
 
//   const [query, setQuery] = useState("");
  
//   const { auth, setAuth } = useContext(AuthContext);
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   const navigate = useNavigate();


//   const handleSubmit = async (e) => {

//     e.preventDefault();
//     console.log("query",query);
//     try {
//       const res = await axios.post(
//         `http://localhost:8081/api/v1/auth/query`, 
//      {fname: auth.user && auth.user.fname, email:auth.user && auth.user.email,query
//       });
//        if (res && res.data.success) {
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
//     <>
//     <motion.div>
//       <IconContext.Provider value={{ color: '#fff' }}>
//         <Nav>
//           <NavIcon to=''>
//             <FaIcons.FaBars onClick={toggleSidebar} />
//           </NavIcon>
//           <NavIcon to='/Home'>
//             <AiIcons.AiFillHome />
//           </NavIcon>
//           <NavIcon to='#'>
//           <NotificationComponent /> {/* Add the NotificationComponent */}
//         </NavIcon>
//         <NavIcon to='#'>
//           <EmailComponent /> {/* Add the NotificationComponent */}
//         </NavIcon>
//         </Nav>

//         <SidebarNav
//           initial={sidebarOpen ? 'open' : 'closed'}
//           animate={sidebarOpen ? 'open' : 'closed'}
//           variants={sidebarVariants}
//           sidebar={sidebarOpen}
//         >
//           <SidebarWrap
//             initial={sidebarOpen ? 'open' : 'closed'}
//             animate={sidebarOpen ? 'open' : 'closed'}
//             variants={sidebarVariants}
//             sidebar={sidebarOpen}
//           >
//             <NavIcon to=''>
//               <AiIcons.AiOutlineClose onClick={toggleSidebar} />
//             </NavIcon>
//             {SidebarData.map((item, index) => {
//               return <SubMenu item={item} key={index} />;
//             })}
//           </SidebarWrap>
//         </SidebarNav>

//         <AdminContent
//           initial={sidebarOpen ? 'open' : 'closed'}
//           animate={sidebarOpen ? 'open' : 'closed'}
//           variants={contentVariants}
//         >
//       <div className="contact_info">
//         <div className="container-fluid">
        
//           <div className="row">
//           <form
//         method="POST"
//         className="contact-form"
//         id="contact-form"
//         onSubmit={handleSubmit}
//       >
//             <div className="col-lg-10 offser-lg-1 d-flex justify-content-between">
//               <div className="contact_info_item d_flex justify-content-start">
//                 <div className="contact_info_content">
//                   <FaIcons.FaPhone></FaIcons.FaPhone>
//                   <div className="contact_info_title">FirstName</div>
//                   <div className="contact_info_text">
//                     {auth.user && auth.user.fname}
//                   </div>
//                 </div>
//                 <div className="contact_info_item d_flex justify-content-start">
//                   <div className="contact_info_content">
//                     <FaIcons.FaEnvelope></FaIcons.FaEnvelope>
//                     <div className="contact_info_title">Email</div>
//                     <div className="contact_info_text">
//                       {auth.user && auth.user.email}
//                     </div>
//                   </div>
//                   <div className="contact_info_item d_flex justify-content-start">
//                     <div className="contact_info_content">
//                       <FaIcons.FaIdCard></FaIcons.FaIdCard>
//                       <div className="contact_info_title">
//                        {auth.user && auth.user.regnumber}
//                       </div>
//                       <div className="contact_info_text">01</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="contact_form">
//               <div className="containers overflow-hidden">
//                 <div className="row gx-5">
//                   <div className="col-lg-10 offset-lg-1">
//                     <div className="contact_form_container py-5">
//                       <div className="contact_form_title"><b>Get in Touch </b></div>
                     
//                       <div className="row ">
                      
//                        <div className="col-4">
//                           <input
//                             type="text"
//                             id="contact_form_name"
//                             className="contact_form_name input_field"
//                             value={auth.user && auth.user.fname}
                           
//                             placeholder="Yourname"
//                             required="true"
//                           />
//                         </div>
                       
//                          <div className="col-4">
//                         <input
//                           type="text"
//                           id="contact_form_email"
//                           className="contact_form_name input_field"
//                           value={auth.user && auth.user.email}
                          
//                           placeholder="Youremail"
//                           required="true"
//                         /> </div>
//                          <div className="col-4">
//                          <input
//                           type="text"
//                           id="contact_form_id"
//                           className="contact_form_name input_field"
//                           value={auth.user && auth.user.regnumber}
                          
//                           placeholder="Your Reg.Id"
//                           required="true"
//                         />
//                         </div>
//                       </div>
//                       </div>

//                       <div className="form-group">
//                       <div className="col-md-12">
//                           <textarea
//                             className="text_field contact_form_message"
//                             id="query"
//                             value={query}
//                             onChange={(e) => setQuery(e.target.value)}
                            
//                             placeholder="Query"
//                             cols="30"
//                             rows="10"
//                           ></textarea>
//                         </div>
//                       </div>

//                       <div className="contact_form_button">
//                         <button type="submit" onSubmit={handleSubmit}>
//                           Send Message
//                         </button>
//                       </div>
                     
//                     </div>
//                   </div>
//                 </div>
                
//               </div>
           
//             </form>
//           </div>
          
//         </div>
//       </div>
//       </AdminContent>
//       </IconContext.Provider>
//     </motion.div>
//   </>
//     </div>
//   );
// };
// const AdminContent = styled(motion.div)`
//   margin-left: ${({ animate }) => (animate === 'open' ? '345px' : '80px')};
//   transition: margin-left 0.01s ease-in-out;
//   background-color: #1e1e2f;
// `;
// export default Contact;
import React, { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useContext, AuthContext } from "../../context/auth.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as FaIcons from "react-icons/fa";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData.js';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
import NotificationComponent from '../user/Messages';
import EmailComponent from '../user/Emails';

const Nav = styled.div`
  background-color: #1e1e2f;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family: "Poppins", sans-serif;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family: "Poppins", sans-serif;
  background-color: #1e1e2f;
`;

const sidebarVariants = {
  open: {
    width: '345px',
    left: '0',
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 20,
    },
  },
  closed: {
    width: '80px',
    left: '-345px',
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 20,
    },
  },
};

const contentVariants = {
  open: {
    marginLeft: '345px',
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 20,
    },
  },
  closed: {
    marginLeft: '0px',
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 20,
    },
  },
};

const SidebarNav = styled(motion.nav)`
  background-color: #1e1e2f;
  width: 345px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-345px')};
  z-index: 10;
`;

const SidebarWrap = styled(motion.div)`
  width: 100%;
  flex: 1;
`;
const ContactForm = styled.form`
  .contact_form_name {
    width: 100%;
  }
  .contact_form_email {
    width: 100%;
  }
  .contact_form_id {
    width: 100%;
  }
  .contact_form_message {
    width: 100%;
  }
  @media screen and (max-width: 767px) {
    .contact_form_name,
    .contact_form_email,
    .contact_form_id,
    .contact_form_message {
      width: 100%;
    }
  }
`;


const Contact = () => {
  const [query, setQuery] = useState("");
  const { auth, setAuth } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("query", query);
    try {
      const res = await axios.post(`http://localhost:8081/api/v1/auth/query`, {
        fname: auth.user && auth.user.fname,
        email: auth.user && auth.user.email,
        query,
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
    <>
      <motion.div>
        <IconContext.Provider value={{ color: '#fff' }}>
          <Nav>
            <NavIcon to=''>
              <FaIcons.FaBars onClick={toggleSidebar} />
            </NavIcon>
            <NavIcon to='/Home'>
              <AiIcons.AiFillHome />
            </NavIcon>
            <NavIcon to='#'>
              <NotificationComponent />
            </NavIcon>
            <NavIcon to='#'>
              <EmailComponent />
            </NavIcon>
          </Nav>

          <SidebarNav
            initial={sidebarOpen ? 'open' : 'closed'}
            animate={sidebarOpen ? 'open' : 'closed'}
            variants={sidebarVariants}
            sidebar={sidebarOpen}
          >
            <SidebarWrap
              initial={sidebarOpen ? 'open' : 'closed'}
              animate={sidebarOpen ? 'open' : 'closed'}
              variants={sidebarVariants}
              sidebar={sidebarOpen}
            >
              <NavIcon to=''>
                <AiIcons.AiOutlineClose onClick={toggleSidebar} />
              </NavIcon>
              {SidebarData.map((item, index) => {
                return <SubMenu item={item} key={index} />;
              })}
            </SidebarWrap>
          </SidebarNav>

          <AdminContent
            initial={sidebarOpen ? 'open' : 'closed'}
            animate={sidebarOpen ? 'open' : 'closed'}
            variants={contentVariants}
          >
            <div className="contact_info">
              <div className="container-fluid">
                <div className="row">
                  <ContactForm onSubmit={handleSubmit}>
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
                              <div className="contact_form_title">
                                <b>Get in Touch </b>
                              </div>

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
                                  />
                                </div>
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
                    </div>
                  </ContactForm>
                </div>
              </div>
            </div>
          </AdminContent>
        </IconContext.Provider>
      </motion.div>
    </>
  );
};



const AdminContent = styled(motion.div)`
  margin-left: ${({ animate }) => (animate === 'open' ? '345px' : '80px')};
  transition: margin-left 0.01s ease-in-out;
  background-color: #1e1e2f;
`;

export default Contact;
