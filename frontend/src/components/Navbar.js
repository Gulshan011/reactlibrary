import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, AuthContext } from "../context/auth";
import { toast } from "react-toastify";
const Navbar = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate()
  const handleLogOut = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth")
    && navigate('/home')
    toast.success(`Logged out ${auth.user && auth.user.fname}`)
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <NavLink className="navbar-brand" to="/Home">
        ELibrary
      </NavLink>
  
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
 
          <li className="nav-item">
            <NavLink className="nav-link" to={auth.user && auth.user.role==="0"?"/History":"/BooksList"} >IssuedBooks</NavLink>
          </li>

          {!auth.user ? (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Signup">
                  Signup
                </NavLink>
              </li>
            </>
          ) : (
            <>
            <li className="nav-item dropdown">
            <NavLink 
            className="nav-link dropdown-toggle" 
            href="#"
            role="button" 
             data-bs-toggle="dropdown" 
             aria-expanded="false">
             {auth?.user?.fname}
             
            </NavLink>
            <ul className="dropdown-menu">
              <li><NavLink to={`/dashboard/${auth?.user?.role==="1"?'admin':'user'}`}className="dropdown-item" >Dashboard</NavLink></li>
              <NavLink
                  onClick={handleLogOut}
                  className="dropdown-item"
                  to="/Logout"
                >
                  Logout
                </NavLink>
               
             
              </ul>
          </li>

            
               
             
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
