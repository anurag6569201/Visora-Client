function LandingNavbar() {
    return (
        <header data-bs-theme="dark" class="landing_header_navbar">
            <nav class="navbar navbar-expand-md navbar-dark bg-dark">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarCollapse">
                        <ul class="navbar-nav me-auto mb-2 mb-md-0">
                            <li class="nav-item">
                                <a style={{gap:'5px'}} class="nav-link active d-flex justify-content-center align-items-center" aria-current="page" href="#"><i class="bi bi-house"></i> Home</a>
                            </li>
                            <li class="nav-item">
                                <a style={{gap:'5px'}} class="nav-link active d-flex justify-content-center align-items-center" aria-current="page" href="#"><i class="bi bi-file-earmark-person"></i> About</a>
                            </li>
                            <li class="nav-item">
                                <a style={{gap:'5px'}} class="nav-link active d-flex justify-content-center align-items-center" aria-current="page" href="#"><i class="bi bi-person-lines-fill"></i> Contact</a>
                            </li>
                            <li class="nav-item">
                                <a style={{gap:'5px'}} class="nav-link active d-flex justify-content-center align-items-center" aria-current="page" href="#"><i class="bi bi-file-earmark-medical"></i> Sign-Up</a>
                            </li>
                            <li class="nav-item">
                                <a style={{gap:'5px'}} class="nav-link active d-flex justify-content-center align-items-center" aria-current="page" href="#"><i class="bi bi-box-arrow-in-right"></i> Log-in</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default LandingNavbar