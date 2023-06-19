
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ChatbotComponent from './chatbotConfig';

export const Skills = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  // Sample items
  const items = [
    <div key="1">Eternal Alumni System</div>,
    <div key="2">Ary System</div>,
    <div key="3">Result Info</div>,
  ];

  return (
    <section className="skill" id="skills">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="skill-bx wow zoomIn" style={{fontFamily:"Poppins,serif"}}>
              <h2>About us :)</h2>
              <h4>Our motto</h4>
              <p>
                "To transform and empower young women talent through cutting edge education in science, technology, arts and management amalgamated with spiritual rejuvenation for their holistic development to serve the mankind with compassion and love."
                <br />
                Eternal university is NAAC Accredited & ISO 9001: 2015 Certified University established under the Himachal Pradesh Private University (Establishment & Regulation) Act 2006 & Himachal Pradesh Government Act.no. 3 of 2009, with the right to confer degree as per the UGC public notice on private Universities dated April 18, 2011.
                Some of our newly deployed projects are ......
              </p>
              <Carousel
                responsive={responsive}
                infinite={true}
                className="owl-carousel owl-theme skill-slider"
              >
                {items}
              </Carousel>
              
            </div>
            
          </div>
        </div>
      </div>
      <style jsx>{`
        .skill-bx {
          width: 100%;
          overflow: hidden;
        }

        @media (max-width: 464px) {
          .skill-bx p {
            white-space: normal;
          }
        }
      `}</style>
    </section>
  );
};

