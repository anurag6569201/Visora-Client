import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/home/home";
import LandingNavbar from "./components/landing/LandingNavbar";
import LandingFooter from "./components/landing/LandingFooter";
import { ThemeProvider } from "./components/landing/ThemeProvider.jsx";
import ThemeToggle from "./components/landing/ThemeToggle.jsx";

import MainSideBar from "./components/pages/home/components/sidebar.jsx";
import "./assets/landing/js/color-modes.js";
import GLogout from "./components/authentication/GLogout.jsx";
import TopBar from "./components/pages/home/components/topbar.jsx";

import UserProfile from "./components/pages/profile/UserProfile.jsx";



{/* developer routes */}
import CodeEditor from "./developer/DeveloperMain.jsx";
import FullPreview from "./developer/FullPreview.jsx";
import deploy from "./developer/vercel/Deploy.jsx";
import Deploy from "./developer/vercel/Deploy.jsx";
function MainPage() {
    return (
        <>
            <ThemeProvider>
                <ThemeToggle />
            </ThemeProvider>

            <div class="container-fluid main_private_page">
                <div class="row">
                    <MainSideBar/>
                    <main class="col-md-10 ms-sm-auto col-lg-10 px-md-3">
                        <TopBar/>
                        <Routes>
                            <Route path="home/" element={<Home />} />
                            <Route path="logout/" element={<GLogout />} />


                            <Route path="profile/" element={<UserProfile />} />


                            {/* developer routes */}
                            <Route path="dev/editor" element={<CodeEditor />} />
                            <Route path="dev/preview" element={<FullPreview />} />
                            <Route path="dev/vercel/deploy" element={<Deploy />} />
                        </Routes>
                    </main>
                </div>
                <div className="container">
                    <br /><hr /><br />
                </div>
            </div>

            <main>
                <LandingFooter />
            </main>
        </>
    );
}

export default MainPage;
