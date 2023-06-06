import React, { useContext } from "react";
import "./App.css";
import { useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./components/Forms/Login";

import Queries from "./components/Admin/Queries";
import Home from "./components/Home/Home";
import Signup from "./components/Forms/Signup";
import About from "./components/Forms/About";
import Dashboard from "./components/user/Dashboard";
import Messages from "./components/user/Messages";
import BooksList from "./components/Admin/BooksList";
//import Edit from './components/Edit';
import UserList from "./components/Admin/UserList";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/routes/Private";
import Forgotpassword from "./components/Forms/Forgotpassword";
import AdminRoute from "./components/routes/AdminRoute";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AboutRoute from "./components/routes/AboutRoute";
import MyTasks from "./components/Admin/MyTasks";
import Calender from "./components/user/Calender/Calender";
import AdminCalender from "./components/Admin/AdminCalender/AdminCalender.js";
import IssueBook from "./components/user/IssueBook/IssueBook";
import Modal from "./components/user/IssueBook/Modal";
import Contact from "./components/user/Contact";



import Records from "./components/Admin/Records";
import ChatBotWidget from "./components/user/ChatBotWidget";
import DarkMode from "./components/DarkMode";

const App = () => {
  const location = useLocation();

  return (
    <div>
      {location.pathname === "/dashboard/user" ||
      location.pathname === "/messages" ||
      location.pathname === "/About" ||
      location.pathname === "/Queries" ||
      location.pathname === "/BooksList" ||
      location.pathname === "/admincalender" ||
      location.pathname === "/dashboard/admin" ||
      location.pathname === "/dashboard/Admin" ||
      location.pathname === "/issuebook" ||
      location.pathname === "/forgotpassword" ||
      location.pathname === "/history" ||
      location.pathname === "/IssueBookForm" ||
      location.pathname === "/Records" ||
      location.pathname === "/calender" ||
      location.pathname === "/ChatBotWidget" ||
      location.pathname === "/UserList" ||
      location.pathname === "/Contact" ? (
        <div></div>
      ) : (
        <Navbar />
      )}

      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/home" element={<Home />}></Route>
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
        </Route>

        <Route path="/about" element={<AboutRoute />}>
          <Route path="" element={<About />} />
        </Route>

        <Route path="/login" element={<Login />}></Route>
       
        <Route path="/queries" element={<Queries />}></Route>
        <Route path="/userlist" element={<UserList />}></Route>
        <Route path="/chatbotwidget" element={<ChatBotWidget />}></Route>
        <Route path="/messages" element={<Messages />}></Route>
        <Route path="/bookslist" element={<BooksList />}></Route>
        <Route path="/forgotpassword" element={<Forgotpassword />}></Route>
        <Route path="/calender" element={<Calender />}></Route>
        <Route path="/myTasks" element={<MyTasks />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/modal" element={<Modal />}></Route>

        <Route path="/admincalender" element={<AdminCalender />}></Route>
        <Route path="/issuebook" element={<IssueBook />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/records" element={<Records />}></Route>

        <Route path="/darkmode" element={<DarkMode />}></Route>
     
      </Routes>
      <Routes>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
