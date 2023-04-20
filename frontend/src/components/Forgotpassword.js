
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPasssword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8081/api/v1/auth/forgot-password", {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        navigate("/login");
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
      <section className="signin">
        <div className="contanier mt-5">
          <div className="signin-content">
            <div className="signin-form">
              <h2 className="form-title">Reset Password</h2>
              <form method="POST" className="register-form" id="register-form" onSubmit={handleSubmit}>
              
                <div className="form-group">
                  <label htmlFor="email">
                    <i className="zmdi zmdi-email"></i>
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
                  <label htmlFor="newPassword">
                    <i className="zmdi zmdi-lock material-icons-name"></i>
                  </label>
                  <input
                    type="newPassword"
                    name="newPassword"
                    id="newPassword"
                    autoComplete="off"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Your password"
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
                  placeholder="What is the name of your pet?"
                />
              </div>
                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signin"
                    id="signin"
                    className="form-submit"
                    value="Submit"
                    
                    
                  />
                </div>
               
               
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
  };

export default ForgotPasssword ;