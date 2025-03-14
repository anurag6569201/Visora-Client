import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons
import '../../../../assets/mainpage/navbar/topbar.css'

function TopBar() {
    const navigate = useNavigate();
    const [showSearch, setShowSearch] = useState(false);
    const searchRef = useRef(null);

    // Hide search bar when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearch(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
            {/* Search Icon (Click to Show Search Bar) */}
            {!showSearch && (
                <button className="btn topbar_btn border-1" onClick={() => setShowSearch(true)}>
                    <i className="bi bi-search fs-5"></i> {/* Search Icon */}
                </button>
            )}

            {/* Search Bar (Appears when clicked) */}
            {showSearch && (
                <div ref={searchRef} className="flex-grow-1 me-3">
                    <div className="input-group">
                        <span className="input-group-text border-1">
                            <i className="bi bi-search text-muted"></i> {/* Search Icon */}
                        </span>
                        <input 
                            type="text" 
                            className="form-control border-1 shadow-none" 
                            placeholder="Search..." 
                            autoFocus
                            onKeyDown={(e) => e.key === "Escape" && setShowSearch(false)}
                        />
                    </div>
                </div>
            )}

            {/* Logout Button */}
            <button 
                type="button" 
                className="btn btn-secondary crousal_heading_btn"
                onClick={() => navigate('/app/logout')}
            >
                <i className="bi bi-box-arrow-right me-1"></i> Log Out
            </button>
        </div>
    );
}

export default TopBar;
