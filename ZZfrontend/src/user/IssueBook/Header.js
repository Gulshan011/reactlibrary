import React from 'react';
// import SearchForm from "./SearchForm";
import "./Header.css";
import { Outlet } from 'react-router-dom';
const Header = () => {
  return (
    <div className='holder'>
        <header className='header'>
            
            <div className='header-content flex flex-c text-center text-white'>
                <h2 className='header-title text-capitalize'>find your book of choice.</h2><br />
               <Outlet/>
               
            </div>
        </header>
    </div>
  )
}

export default Header