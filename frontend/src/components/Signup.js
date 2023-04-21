import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";

const Signup = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [regnumber, setRegnumber] = useState("");
  const [dept, setDept] = useState("");
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  const [answer, setAnswer] = useState("");
  

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8081/api/v1/auth/register`,
        { fname, lname, email, password, regnumber, role, dept ,gender,answer}
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        
        navigate("/about");

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
      <section className="signup">
        <div className="contanier mt-5">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Sign Up</h2>
              <form method="POST" className="register-form" id="register-form"
              onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="fname">
                    <i className="zmdi zmdi-account material-icons-name"></i>
                  </label>
                  <input
                    type="text"
                    name="fname"
                    id="fname"
                    autoComplete="off"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    placeholder="Your name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lname">
                    <i className="zmdi zmdi-account material-icons-name"></i>
                  </label>
                  <input
                    type="text"
                    name="lname"
                    id="lname"
                    autoComplete="off"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                    placeholder="Your last name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">
                    <i className="zmdi zmdi-email"></i>{" "}
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">
                    <i className="zmdi zmdi-lock material-icons-name"></i>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="regnumber">
                    <i className="zmdi zmdi-sign-in material-icons-name"></i>
                  </label>
                  <input
                    type="text"
                    name="regnumber"
                    id="regnumber"
                    autoComplete="off"
                    value={regnumber}
                    onChange={(e) => setRegnumber(e.target.value)}
                    placeholder="Your regnumber"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="role">
                    <i className="zmdi zmdi-slideshow material-icons-name"></i>
                  </label>
                  <input
                    type="text"
                    name="role"
                    id="role"
                    autoComplete="off"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Type 1 for librarian and 0 for user"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="gender">
                    <i className="zmdi zmdi-male-female"></i>
                  </label>
                  <input
                    type="text"
                    name="gender"
                    id="gender"
                    autoComplete="off"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    placeholder="your gender"/>
                  
                    
                </div>
                <div className="form-group">
                  <label htmlFor="department">
                    <i className="zmdi zmdi-account material-icons-name"></i>
                  </label>
                  <input
                    type="text"
                    name="dept"
                    id="dept"
                    autoComplete="off"
                    value={dept}
                    onChange={(e) => setDept(e.target.value)}
                    placeholder="your dept"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="answer">
                    <i className="zmdi zmdi-info"></i>
                  </label>
                  <input
                    type="text"
                    name="answer"
                    id="answer"
                    autoComplete="off"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="What is your PETNAME?"
                  />
                </div> 

                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signup"
                    id="signup"
                    className="form-submit"
                    value="register"
                   
                  />
                </div>
                <NavLink to="/Login" className="signup-image-link">
                  Already have an account? _Login!!
                </NavLink>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Signup;
