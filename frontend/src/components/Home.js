import React from 'react'
import { toast } from "react-toastify";
import{useContext,AuthContext}from "../context/auth.js";

const Home = () => {
  const{auth,setAuth}=useContext(AuthContext);
  if(auth.user && auth.user.fname){
    toast.success(`WELCOME ${auth.user && auth.user.fname}!!!!`);
  }
  else{
    toast.error(`Logged out ;relogin!!`);
  }
  
  return (
    <div >
   
    <div className='home-page'>
    <div className="box-content">
      <div className="home-div">
        <p className="pt-5">WELCOME {auth.user && auth.user.fname}</p>
        <h1>ETERNAL LIBRARY</h1>
        
       </div>
    </div>
    </div>
    </div>
 
  )
}
export default Home