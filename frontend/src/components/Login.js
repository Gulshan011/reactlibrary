import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext, AuthContext, useAuth } from "../context/auth.js";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth, setAuth } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message,{ delay: 1000 });

        setAuth({
          ...auth,
          user: res.data.user.fname,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/About");
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
              <h2 className="form-title">Sign In</h2>
              <form
                method="POST"
                className="register-form"
                id="register-form"
                onSubmit={handleSubmit}
              >
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
                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signin"
                    id="signin"
                    className="form-submit"
                    value="Login"
                  />
                </div>
                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="Forgot Password"
                    id="Forgot Password"
                    className="form-submit"
                    value="Forgot Password"
                    onClick={() => {
                      navigate("/forgot-password");
                    }}
                  />
                </div>
                <NavLink to="/Signup" className="signin-image-link">
                  Don't have an account? Register now!
                </NavLink>
                <div></div>
              </form>
              
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
