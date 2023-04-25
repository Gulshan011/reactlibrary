import React from "react";
import "./App.css";
import { useLocation } from 'react-router-dom';

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Home from "./components/Home";
import Signup from "./components/Signup";
import About from "./user/About";
import Dashboard from "./user/Dashboard";

//import Edit from './components/Edit';

import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/routes/Private";
import Forgotpassword from "./components/Forgotpassword";
import AdminRoute from "./components/routes/AdminRoute";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AboutRoute from "./components/routes/AboutRoute";
import MyTasks from "./components/Admin/MyTasks";
import Calender from './components/Calender'
import IssueBook from "./user/IssueBook/IssueBook";
import Modal from "./user/IssueBook/Modal";
import Contact from "./components/Contact";
import History from "./user/History";
const App = () => {
  const location = useLocation();

  return (
    <div>
    {location.pathname === '/dashboard/user'||location.pathname === '/dashboard/admin'||location.pathname ==='/issuebook'||location.pathname ==='/history'||location.pathname === '/IssueBookForm'||location.pathname === '/calender'||location.pathname === '/Contact'? (
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
      
      <Route path="/about" element={<AboutRoute/>}>
        <Route path="" element={<About />} />
      </Route>
       
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgot-password" element={<Forgotpassword />}></Route>
        <Route path="/calender" element={<Calender/>}></Route>
        <Route path="/myTasks" element={<MyTasks/>}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/modal" element={<Modal/>}></Route>
        <Route path="/issuebook" element={<IssueBook />}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/history" element={<History/>}></Route>
      </Routes>
      <Routes>
      <Route path="/dashboard" element={<AdminRoute/>}>
      <Route path="admin" element={<AdminDashboard />} />
     
    </Route>
    </Routes>
    
    </div>
  );
};

export default App;


