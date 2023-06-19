import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import { useContext } from "react";
import { AuthContext } from "../../context/auth";

import TrackVisibility from 'react-on-screen';
import { Navigate, useNavigate } from "react-router-dom";
import ChatbotComponent from "./chatbotConfig";
import Carousel from 'react-bootstrap/Carousel';
import headerImg from "../../images/books.jpg";
import bgImg from "../../images/bg.jpeg";
import bgImg2 from "../../images/eter.jpeg";
import bgImg3 from "../../images/gallery01.jpg"
export const Banner = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <section className="banner" id="home">
   
        <Carousel>
          
            <Carousel.Item>
            <div
          className="carousel-image"
          style={{
            position: 'relative',
            width: '100%',
            height: '800px',
          }}
        >
          <div
            className="image-overlay"
            style={{
              backgroundImage: `url(${bgImg})`,
              opacity: 0.2,
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              
            }}
          ></div>
          <div className="content-container d-flex align-items-center justify-content-center " >
              <Row className="align-items-center">
                <Col xs={12} md={6} xl={7}>
                  <TrackVisibility>
                    {({ isVisible }) => (
                      <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                        <span className="tagline"style={{color:"white"}}>Welcome</span>
                        <h1>{`Hi! , ${auth.user && auth.user.fname}`} <span className="txt-rotate" dataPeriod="1000"><span className="wrap"></span></span></h1>
                        <p style={{ fontSize: "25px" }}>More than 25,000 books of national and international authors are on the shelves, enrich your knowledge here !!!..📖📖📖📖</p>
                        <button onClick={() => navigate("/Login")}>Let’s Connect <ArrowRightCircle size={25} /></button>
                      </div>
                    )}
                  </TrackVisibility>
                </Col>
                <Col xs={12} md={6} xl={5}>
                  <TrackVisibility>
                    {({ isVisible }) => (
                      <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                        <img src={headerImg} style={{ borderRadius: "60%", height: "400px", width: "400px" }} alt="Header Img" className="header-image img-fluid" />
                      </div>
                    )}
                  </TrackVisibility>
                </Col>
              </Row>
            </div>
            </div>
          </Carousel.Item>


          
          <Carousel.Item>
          <div
          className="carousel-image"
          style={{
            position: 'relative',
            width: '100%',
            height: '800px',
          }}
        >
          <div
            className="image-overlay"
            style={{
              backgroundImage: `url(${bgImg2})`,
              opacity: 0.2,
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              
            }}
          ></div>
          <div className="content-container d-flex align-items-center justify-content-center mt-20">
            <Row className="align-items-center">
              <Col xs={12} md={6} xl={7}>
                <TrackVisibility>
                  {({ isVisible }) => (
                    <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                      <span className="tagline" style={{color:"white"}}>Welcome</span>
                      <h1>{`Hi! , ${auth.user && auth.user.fname}`} <span className="txt-rotate" dataPeriod="1000"><span className="wrap"></span></span></h1>
                      <p style={{ fontSize: "25px" }}>Eternal University is launching a free internship to imrove communications ; Don't miss the opportunity 🤝..🤝</p>
                      <button onClick={() => navigate("/Login")}>Let’s Connect <ArrowRightCircle size={25} /></button>
                    </div>
                  )}
                </TrackVisibility>
              </Col>
              <Col xs={12} md={6} xl={5}>
                <TrackVisibility>
                  {({ isVisible }) => (
                    <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                      <img src={headerImg} style={{ borderRadius: "60%", height: "400px", width: "400px" }} alt="Header Img" className="header-image img-fluid" />
                    </div>
                  )}
                </TrackVisibility>
              </Col>
            </Row>
          </div>
          </div>
        </Carousel.Item>



        <Carousel.Item>
        <div
          className="carousel-image"
          style={{
            position: 'relative',
            width: '100%',
            height: '800px',
          }}
        >
          <div
            className="image-overlay"
            style={{
              backgroundImage: `url(${bgImg3})`,
              opacity: 0.2,
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              
            }}
          ></div>
          <div className="content-container d-flex align-items-center justify-content-center mt-20">
            <Row className="align-items-center justify-content-center">
              <Col xs={12} md={6} xl={7}>
                <TrackVisibility>
                  {({ isVisible }) => (
                    <div className={`content ${isVisible ? "animate__animated animate__fadeIn" : ""}`}>
                      <span className="tagline"style={{color:"white"}}>Welcome</span>
                      <h1>{`Hi! , ${auth.user && auth.user.fname}`} <span className="txt-rotate" dataPeriod="1000"><span className="wrap"></span></span></h1>
                      <p style={{ fontSize: "25px" }}>It would be fun this Independence Day; we, the library department, would be promoting the learn and grow scheme; Join us..😃😃😃</p>
                      <button onClick={() => navigate("/Login")}>Let’s Connect <ArrowRightCircle size={25} /></button>
                    </div>
                  )}
                </TrackVisibility>
              </Col>
              <Col xs={12} md={6} xl={5}>
                <TrackVisibility>
                  {({ isVisible }) => (
                    <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                      <img src={headerImg} style={{ borderRadius: "60%", height: "400px", width: "400px" }} alt="Header Img" className="header-image img-fluid" />
                    </div>
                  )}
                </TrackVisibility>
              </Col>
            </Row>
          </div>
        </div>
      </Carousel.Item>
      
      
          
          
        </Carousel>
        
   
      {auth.user && auth.user.role === "0" && (
        <ChatbotComponent />
      )}
    </section>
  );
};

