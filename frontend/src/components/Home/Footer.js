import { Container, Row, Col } from "react-bootstrap";

import navIcon1 from "../../images/linkedin.png";
import navIcon2 from "../../images/Facebook_icon.svg.webp";
import navIcon3 from "../../images/download.jpeg";

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
         
          <Col size={12} sm={6}>
            
          </Col>
          <Col size={12} sm={6} className="text-center text-sm-end">
            <div className="social-icon">
              <a href="https://in.linkedin.com/school/eternal-university-baru-sahib-sirmour/"><img src={navIcon1} alt="Icon" /></a>
              <a href="https://www.facebook.com/eternaluni/"><img src={navIcon2} alt="Icon" /></a>
              <a href="https://www.instagram.com/eternaluniversityedu/?hl=en"><img src={navIcon3} alt="Icon" /></a>
            </div>
            <p>Copyright 2022. All Rights Reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
