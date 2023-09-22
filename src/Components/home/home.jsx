import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import {Helmet, HelmetProvider} from "react-helmet-async";
const Home  = () => {
    return (
        <HelmetProvider>
        <Helmet>
            <title>شرکت فرودگاهی عقاب عسلویه</title>
            <meta name='description' content='سامانه مدیریتی شرکت فرودگاهی عقاب عسلویه' />
        </Helmet>

            <Carousel fade pause={false} className="mx-2 shadow-lg position-sticky">
                    <Carousel.Item interval={10000}>
                        <img src={require('./photo1.jpg')} className="d-block w-100 rounded-3" style={{maxHeight:'70vh'}} alt="..."/>
                    </Carousel.Item>
                    <Carousel.Item interval={10000}>
                        <img src={require('./photo2.jpg')} className="d-block w-100 rounded-3" style={{maxHeight:'70vh'}} alt="..."/>
                    </Carousel.Item>
                    <Carousel.Item interval={10000}>
                        <img src={require('./photo3.jpg')} className="d-block w-100 rounded-3" style={{maxHeight:'70vh'}} alt="..."/>
                    </Carousel.Item>
            </Carousel>
        </HelmetProvider>
    )
}
export default Home