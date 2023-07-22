import React from "react";
import Carousel from 'react-bootstrap/Carousel';
const Home  = () => {
    return (
            <Carousel fade pause={false} className="mx-2 shadow-lg position-sticky">
                    <Carousel.Item interval={2000}>
                        <img src={require('./photo1.jpg')} className="d-block w-100 rounded-3" style={{maxHeight:'70vh'}} alt="..."/>
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                        <img src={require('./photo2.jpg')} className="d-block w-100 rounded-3" style={{maxHeight:'70vh'}} alt="..."/>
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                        <img src={require('./photo3.jpg')} className="d-block w-100 rounded-3" style={{maxHeight:'70vh'}} alt="..."/>
                    </Carousel.Item>
            </Carousel>
    )
}
export default Home