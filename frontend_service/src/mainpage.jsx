import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/home/home";
import LandingNavbar from "./components/landing/LandingNavbar";
import LandingFooter from "./components/landing/LandingFooter";
import { ThemeProvider } from "./components/landing/ThemeProvider.jsx";
import ThemeToggle from "./components/landing/ThemeToggle.jsx";

import "./assets/landing/js/color-modes.js";

function MainPage() {
    return (
        <>
            <ThemeProvider>
                <ThemeToggle />
            </ThemeProvider>

            <Routes>
                <Route path="home/" element={<Home />} />
            </Routes>

            <main>
                <LandingFooter />
            </main>
        </>
    );
}

export default MainPage;
