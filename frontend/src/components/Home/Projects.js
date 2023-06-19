import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../../images/eter.jpeg";
import projImg2 from "../../images/facility.jpeg";
import projImg3 from "../../images/fun.jpeg";
import projImg4 from "../../images/hostel.jpeg";
import projImg5 from "../../images/nurse.jpg";
import projImg6 from "../../images/cafe.jpeg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';


export const Projects = () => {

  const projects = [
    {
      title: "College Library",
      description: " Engineering Workshop ",
      imgUrl: projImg1,
    },
    {
      title: "Facilities ",
      description: "24 Hour Electric Supply",
      imgUrl: projImg2,
    },
    {
      title: "Activities",
      description: "We promote students to do co-curriculur activities",
      imgUrl: projImg3,
    },
    {
      title: "Hostel",
      description: "Rooms are spacious, neat and clean with separate wardrobes with their individual lock key is provided to each Student",
      imgUrl: projImg4,
    },
    {
      title: "Nursing College ",
      description: "We offer 24*7 HOSPITAL SERVICES",
      imgUrl: projImg5,
    },
    {
      title: "Cafeteria",
      description: "We even have a cafeteria service for the students and visitors",
      imgUrl: projImg6,
    },
  ];

  return (
    <section className="project" id="project">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>Gallery</h2>
                <p style={{fontFamily:"Poppins ,sans-serif",fontStyle:"oblique"}}>The Kalgidhar Trust established Eternal University for the upliftment of girl childs ;uplifting a girl is uplifting a society .Some highlights of Eternal University !!!</p>
              
                 
                      <Row>
                        {
                          projects.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>
                    
                    
           
              </div>}
            </TrackVisibility>
           
          </Col>
        </Row>
      </Container>

    </section>
  )
}
