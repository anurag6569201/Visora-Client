import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/home/home";
import LandingNavbar from "./components/landing/LandingNavbar";
import LandingFooter from "./components/landing/LandingFooter";

function MainPage() {
    return (
        <>
            <LandingNavbar />

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
