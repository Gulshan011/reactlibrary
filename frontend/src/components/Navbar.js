import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { NavDropdown } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import { color } from "@mui/system";
import logo from "../images/logo.jpg";

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
    localStorage.removeItem("inboxChecked");

    Swal.fire({
      title: "Success!",
      text: "Logged out!!!",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
      didClose: () => {
        navigate("/login");
      },
    });
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{
        fontFamily: "Poppins, sans-serif",
        fontWeight: "300",
        fontSize: "20px",
      }}
    >
      <Link className="navbar-brand" to="/Home">
        <img
          src={logo}
          style={{ display: "inline-block", height:"50px", width:"50px" ,borderRadius:"50px" }}
          alt="Logo"
        />
        <span
          style={{
            display: "inline-block",
            fontFamily: "Poppins, sans-serif",
            color: "white",
           fontWeight: "300",
        fontSize: "20px",
          }}
        >
          ELibrary
        </span>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        onClick={handleToggle}
        aria-controls="navbarSupportedContent"
        aria-expanded={isNavbarOpen ? "true" : "false"}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" style={{ color: "white" }}>
          <FaBars />
        </span>
      </button>
      <div
        className={`collapse navbar-collapse ${
          isNavbarOpen ? "show" : ""
        }`}
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link
              className="nav-link"
              style={{ color: "white" }}
              to={auth.user && auth.user.role === "1" ? "/BooksList" : ""}
            ></Link>
          </li>
          {auth.user && auth.user.role === "0" && (
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/ChatBotWidget"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  color: "white",
                }}
              >
                Chat
              </Link>
            </li>
          )}

          {!auth.user ? (
            <>
              <li className="nav-item" style={{ color: "white" }}>
                <Link
                  className="nav-link"
                  style={{ color: "white" }}
                  to="/Login"
                >
                  Login
                </Link>
              </li>
              <li className="nav-item" style={{ color: "white" }}>
                <Link
                  className="nav-link"
                  style={{ color: "white" }}
                  to="/Signup"
                >
                  Signup
                </Link>
              </li>
            </>
          ) : (
            <>
              <NavDropdown title={auth?.user?.fname} id="basic-nav-dropdown" style={{ color: "white" }}>
                <Link
                  to={`/dashboard/${
                    auth?.user?.role === "1" ? "admin" : "user"
                  }`}
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
