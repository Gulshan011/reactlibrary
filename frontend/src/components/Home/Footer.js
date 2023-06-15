

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import navIcon1 from "../../images/linkedin.png";
import navIcon2 from "../../images/Facebook_icon.svg.webp";
import navIcon3 from "../../images/download.jpeg";


export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
  
        <Row>
          <Col xs={12}>
            <h4>
              Glimpses of the first Girls University of Himachal Pradesh 💫
            </h4>
            <div className="video-container d-flex flex-row overflow-hidden">
              <div className="video-frame move-left">
                <iframe
                  width="300"
                  height="200"
                  src="https://www.youtube.com/embed/gJ7RDAUrKg8"
                  title="YouTube video 1"
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
              <div className="video-frame move-left">
                <iframe
                  width="300"
                  height="200"
                  src="https://www.youtube.com/embed/9ndsjPYOzCQ"
                  title="YouTube video 2"
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
              <div className="video-frame move-left">
                <iframe
                  width="300"
                  height="200"
                  src="https://www.youtube.com/embed/f1nQQmD2ogA"
                  title="YouTube video 3"
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
              <div className="video-frame move-left">
                <iframe
                  width="300"
                  height="200"
                  src="https://www.youtube.com/embed/RIsD2_ptQTU"
                  title="YouTube video 4"
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </Col>
        </Row>
        
        <Row className="align-items-center">
          <Col size={12} sm={6}></Col>
          <Col size={12} sm={6} className="text-center text-sm-end">
            <div className="social-icon">
              <a href="https://in.linkedin.com/school/eternal-university-baru-sahib-sirmour/">
                <img src={navIcon1} alt="Icon" />
              </a>
              <a href="https://www.facebook.com/eternaluni/">
                <img src={navIcon2} alt="Icon" />
              </a>
              <a href="https://www.instagram.com/eternaluniversityedu/?hl=en">
                <img src={navIcon3} alt="Icon" />
              </a>
            </div>
            <p> 
          Project by Gulshan 💖</p>
          </Col>
        </Row>
      </Container>
  
    </footer>
  );
};
