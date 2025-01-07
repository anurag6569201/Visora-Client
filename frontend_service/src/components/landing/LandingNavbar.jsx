import { Link } from "react-router-dom";

function LandingNavbar() {
    return (
        <header data-bs-theme="dark" className="landing_header_navbar">
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav me-auto mb-2 mb-md-0">
                            <li className="nav-item">
                                <Link className="nav-link active d-flex justify-content-center align-items-center" to="/"><i className="bi bi-house"></i> Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active d-flex justify-content-center align-items-center" to="/about"><i className="bi bi-file-earmark-person"></i> About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active d-flex justify-content-center align-items-center" to="/contact"><i className="bi bi-person-lines-fill"></i> Contact</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active d-flex justify-content-center align-items-center" to="/signup"><i className="bi bi-file-earmark-medical"></i> Sign-Up</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active d-flex justify-content-center align-items-center" to="/login"><i className="bi bi-box-arrow-in-right"></i> Log-in</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default LandingNavbar;
