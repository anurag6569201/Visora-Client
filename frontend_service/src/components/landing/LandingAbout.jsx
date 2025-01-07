import React from 'react';
import aboutus from '../../assets/landing/images/aboutus.png'

function LandingAbout() {
    return (
        <>
            <div class="px-4 pt-5 my-5 text-left border-bottom landing_about_us">
                <h1 class="display-4 fw-bold text-body-emphasis text-center">About Us</h1>
                <div class="col-lg-10 mx-auto">
                    <p class="lead mb-4">At RFQLancer, we are redefining the way businesses handle procurement and vendor management. With a focus on innovation, efficiency, and transparency, our platform simplifies the entire RFQ process—from vendor matchmaking to bid evaluation—empowering organizations to make smarter, faster decisions.</p>
                    <p class="lead mb-4">Our mission is to create a seamless procurement experience that saves time, reduces costs, and enhances collaboration. Whether you're a startup exploring new suppliers or an established enterprise optimizing your sourcing strategy, our platform is designed to meet your unique needs.</p>
                    <p class="lead mb-4">With features like AI-driven bid scoring, real-time dashboards, vendor ratings, and chat integrations, we aim to bridge the gap between buyers and vendors, fostering trust and long-term partnerships.</p>
                    <p class="lead mb-4">At the core of what we do lies our commitment to quality, innovation, and customer success. Join us on this journey to transform procurement into a powerful, streamlined, and insightful process.</p>
                </div>
                <div class="overflow-hidden text-center" style={{maxHeight:'45vh'}}>
                    <div class="container px-5">
                        <img src={aboutus} class="img-fluid border rounded-3 shadow-lg mb-4" alt="Example image" width="900" height="500" loading="lazy" />
                    </div>
                </div>
            </div>
        </>

    )
}

export default LandingAbout