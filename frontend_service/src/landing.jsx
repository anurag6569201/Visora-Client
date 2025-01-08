import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./assets/landing/css/landing.css";
import "./assets/landing/js/color-modes.js";

import { ThemeProvider } from "./components/landing/ThemeProvider.jsx";
import ThemeToggle from "./components/landing/ThemeToggle.jsx";
import LandingNavbar from "./components/landing/LandingNavbar.jsx";
import LandingCrousal from "./components/landing/LandingCrousal.jsx";
import LandingFooter from "./components/landing/LandingFooter.jsx";

import LandingAbout from "./components/landing/LandingAbout.jsx";
import LandingContact from "./components/landing/LandingContact.jsx";
import GLogin from "./components/authentication/GLogin.jsx";
import GRegister from "./components/authentication/GRegister.jsx";

function Landing() {
    return (
        <>
            <ThemeProvider>
                <ThemeToggle />
            </ThemeProvider>

            <LandingNavbar />

            <Routes>
                <Route path="/" element={<LandingCrousal />} />
                <Route path="/about" element={<LandingAbout />} />
                <Route path="/contact" element={<LandingContact />} />
                <Route path="/signup" element={<GRegister />} />
                <Route path="/login" element={<GLogin />} />
            </Routes>

            <main>
                <LandingFooter />
            </main>
        </>
    );
}

export default Landing;
