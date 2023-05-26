

import headerImg from "../../images/books.jpg";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { Navigate } from "react-router-dom";

export const Banner = () => {

 const { auth, setAuth } = useContext(AuthContext);

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <span className="tagline">Welcome </span>
                <h1>{`Hi! ,  ${auth.user && auth.user.fname}`} <span className="txt-rotate" dataPeriod="1000" ><span className="wrap"></span></span></h1>
                  <p>More than 25,000 books of national and international authors are on the shelves, besides access to curriculum based videos and web courses through NPTL and MIT courses wares..</p>
                  <button onClick={() => console.log('connect')}>Let’s Connect <ArrowRightCircle size={25} /></button>
              </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src={headerImg} style={{borderRadius:"60%" ,height:"500px",width:"500px"}} alt="Header Img"/>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}


