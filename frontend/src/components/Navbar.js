
import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { toast } from "react-toastify";
import { NavDropdown } from "react-bootstrap";
import { FaBars } from 'react-icons/fa';

const Navbar = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const handleToggle = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleLogOut = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    navigate("/home");
    toast.success(`Logged out ${auth.user && auth.user.fname}`);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark"  style={{ fontFamily: "Poppins, sans-serif" ,fontWeight:"300px" }} >
      <Link className="navbar-brand" to="/Home" style={{ fontFamily: "Poppins, sans-serif" }} >
        ELibrary
      </Link>

      <button
        className="navbar-toggler" 
        type="button"
        onClick={handleToggle}
        aria-controls="navbarSupportedContent"
        aria-expanded={isNavbarOpen ? "true" : "false"}
        aria-label="Toggle navigation"
      >
      <span className="navbar-toggler-icon">
      <FaBars />
    </span>
</button>
      <div
        className={`collapse navbar-collapse ${isNavbarOpen ? "show" : ""}`}
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link
              className="nav-link"
              to={auth.user && auth.user.role === "0" ? "/History" : "/BooksList"}
            >
              IssuedBooks
            </Link>
          </li>

          {!auth.user ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/Login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Signup">
                  Signup
                </Link>
              </li>
            </>
          ) : (
            <>
              <NavDropdown title={auth?.user?.fname} id="basic-nav-dropdown">
                <Link
                  to={`/dashboard/${auth?.user?.role === "1" ? "admin" : "user"}`}
                  className="dropdown-item"
                >
                  Dashboard
                </Link>
                <NavDropdown.Divider />
                <Link
                  onClick={handleLogOut}
                  className="dropdown-item"
                  to="/Logout"
                >
                  Logout
                </Link>
              </NavDropdown>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
