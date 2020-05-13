import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import c_1 from '../images/carsoul_images/carsoul-1.jpg'
import c_2 from '../images/carsoul_images/carsoul-2.jpeg'
import c_3 from '../images/carsoul_images/carsoul-3.jpg'




function ControlledCarousel() {
    const [index, setIndex] = React.useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
    return (
      <div className="carousel-div">
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
           
            src={c_1}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
           
            src={c_2}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
           
          src={c_3}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
      </div>
    );
  }

export default ControlledCarousel;