import Crousal1 from '../../assets/landing/images/crousal1.svg'
import Crousal2 from '../../assets/landing/images/crousal2.svg'
import Crousal3 from '../../assets/landing/images/crousal3.svg'
function LandingCrousal() {
    return (
        <div id="myCarousel" class="carousel slide mb-6" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <div class="bd-placeholder-img row" width="100%" height="100%">
                        <div className="col-md-6">
                            <div className='crousal_heading'>
                                <h1><span>RFQ</span> <br />Management</h1>
                                <p>Streamlining procurement with seamless RFQ management—empowering organizations to easily request, compare, and manage quotations for efficient decision-making.</p>
                                <p><a class="btn btn-lg crousal_heading_btn" href="#">Learn more</a></p>
                            </div>
                        </div>
                        <div className="col-md-6 d-flex justify-content-center align-items-center" style={{height:'100vh'}}>
                            <img src={Crousal1}  alt="" width="80%"/>
                        </div>
                    </div>
                    
                </div>
                <div class="carousel-item">
                    <div class="bd-placeholder-img row" width="100%" height="100%">
                        <div className="col-md-6">
                            <div className='crousal_heading'>
                                <h1><span>Trust </span> <br />Excellence</h1>
                                <p>Enhancing customer loyalty through seamless quality improvement—empowering organizations to build trust and foster lasting relationships.</p>
                                <p><a class="btn btn-lg crousal_heading_btn" href="#">Learn more</a></p>
                            </div>
                        </div>
                        <div className="col-md-6 d-flex justify-content-center align-items-center" style={{height:'100vh'}}>
                            <img src={Crousal2}  alt="" width="80%"/>
                        </div>
                    </div>
                    
                </div>
                <div class="carousel-item">
                    <div class="bd-placeholder-img row" width="100%" height="100%">
                        <div className="col-md-6">
                            <div className='crousal_heading'>
                                <h1><span>Vendor  </span> <br />Matching</h1>
                                <p>Revolutionizing vendor selection with a Tinder-like matching system—empowering buyers to discover, compare, and connect with the perfect vendors effortlessly.</p>
                                <p><a class="btn btn-lg crousal_heading_btn" href="#">Learn more</a></p>
                            </div>
                        </div>
                        <div className="col-md-6 d-flex justify-content-center align-items-center" style={{height:'100vh'}}>
                            <img src={Crousal3}  alt="" width="80%"/>
                        </div>
                    </div>
                    
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                <span class="" aria-hidden="true"><i class="bi bi-arrow-left-circle-fill"></i></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                <span class="" aria-hidden="true"><i class="bi bi-arrow-right-circle-fill"></i></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    )
}

export default LandingCrousal