import React from 'react'
//import logo from './logo.svg';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { NavBar } from "./components/NavBar";
import { Banner } from "./Banner";
import { Skills } from "./Skills";
import { Projects } from "./Projects";
import { Footer } from './Footer';


const Home = () => {
  
 
  return (
    <div>
   
    <Banner />
    <Skills />
    <Projects />
  <Footer/>
    </div>
 
  )
}
export default Home