import React from 'react';
import aboutus from '../../assets/landing/images/about.png'

function LandingAbout() {
    return (
        <>
            <div className="px-4 pt-5 my-5 text-left border-bottom landing_about_us">
                <h1 className="display-4 fw-bold text-body-emphasis text-center">About Us</h1>
                <div className="col-lg-10 mx-auto">
                    <p className="lead mb-4">
                        At <strong>Visora</strong>, we are redefining the future of <strong>interactive learning</strong> by bridging the gap between 
                        <strong> students, educators, developers, and researchers</strong>. Our platform provides a <strong>unified space</strong> for 
                        <strong> educational simulations, animations, and AI-powered study planning</strong> to revolutionize how knowledge is shared and consumed.
                    </p>
                    <p className="lead mb-4">
                        Our mission is to <strong>empower students</strong> with engaging, personalized learning experiences while enabling 
                        educators to <strong>seamlessly integrate simulations into their teaching plans</strong>. With our 
                        <strong> AI-driven study planner</strong>, professors can efficiently organize lectures, track progress, and adapt lesson plans dynamically.
                    </p>
                    <p className="lead mb-4">
                        <strong>Developers and animators</strong> play a crucial role by contributing high-quality <strong>educational simulations and animations</strong>, 
                        making complex concepts easy to visualize and understand. Meanwhile, <strong>researchers</strong> can publish advanced interactive content 
                        to enhance academic exploration.
                    </p>
                    <p className="lead mb-4">
                        Our platform also facilitates <strong>smart educator-developer collaboration</strong>, allowing subject-matter experts and creators to 
                        work together on <strong>custom, high-impact educational content</strong>. Whether you're a <strong>student seeking immersive learning</strong>, 
                        an <strong>educator looking to enhance teaching</strong>, or a <strong>developer eager to contribute</strong>, Visora is built for you.
                    </p>
                    <p className="lead mb-4">
                        Join us as we transform traditional learning into a <strong>collaborative, AI-powered, and visually engaging experience</strong>—where 
                        education meets innovation! 🚀
                    </p>
                </div>
                <div className="overflow-hidden text-center" style={{ maxHeight: "45vh" }}>
                    <div className="container px-5">
                        <img src={aboutus} className="img-fluid border rounded-3 shadow-lg mb-4" 
                            alt="About Us" width="900" height="500" loading="lazy" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingAbout