import company1 from '../../assets/landing/images/company/analyzer.webp'
import company2 from '../../assets/landing/images/company/canvas.webp'
import company3 from '../../assets/landing/images/company/tfl_logo.webp'

function LandingMain() {
    return (
        <div class="container marketing">
            <div class="row">
                <div class="col-lg-4">
                    <img class="bd-placeholder-img rounded-circle" width="140" height="140" src={company1} alt="" />
                    <h2 class="fw-normal">Mr-Analyzer</h2>
                    <p>MR-Analyzer can streamline vendor selection for analytics tools and services with the RFQ platform, saving time and ensuring transparency.</p>
                    <p><a class="btn btn-secondary crousal_heading_btn" href="#">View details &raquo;</a></p>
                </div>
                <div class="col-lg-4">
                    <img class="bd-placeholder-img rounded-circle" width="140" height="140" src={company2} alt="" />
                    <h2 class="fw-normal">Canvas</h2>
                    <p>The Flavour Lake benefits from simplified supplier matching and automated RFQ comparisons, ensuring quality ingredients and efficient sourcing.</p>
                    <p><a class="btn btn-secondary crousal_heading_btn" href="#">View details &raquo;</a></p>
                </div>
                <div class="col-lg-4">
                    <img class="bd-placeholder-img rounded-circle" width="140" height="140" src={company3} alt="" />
                    <h2 class="fw-normal">The Flavour Lake</h2>
                    <p>Canvas enhances creative procurement by discovering reliable vendors and securing the best deals through seamless RFQ management.</p>
                    <p><a class="btn btn-secondary crousal_heading_btn" href="#">View details &raquo;</a></p>
                </div>
            </div>
            <hr class="featurette-divider" />
        </div>
    )
}

export default LandingMain