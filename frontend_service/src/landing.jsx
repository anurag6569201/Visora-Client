import "./assets/landing/css/landing.css";
import "./assets/landing/js/color-modes.js";

import { ThemeProvider } from './components/landing/ThemeProvider.jsx';
import ThemeToggle from './components/landing/ThemeToggle.jsx';
import LandingNavbar from './components/landing/LandingNavbar.jsx';
import LandingCrousal from './components/landing/LandingCrousal.jsx';
import LandingFooter from "./components/landing/LandingFooter.jsx";
import LandingMain from "./components/landing/LandingMain.jsx";

function Landing() {
  return (
    <>
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>

      <LandingNavbar />
      <LandingCrousal />

      <main>
        <LandingMain />
        <LandingFooter />
      </main>
    </>
  )
}

export default Landing
