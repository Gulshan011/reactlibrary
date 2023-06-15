import{React ,useState}from 'react'
//import logo from './logo.svg';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChatbotComponent from './chatbotConfig';
// import { NavBar } from "./components/NavBar";
import { Banner } from "./Banner";
import { Skills } from "./Skills";
import { Projects } from "./Projects";
import { Footer } from './Footer';
import { Segment } from 'semantic-ui-react';
import {Icon}  from 'semantic-ui-react';

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