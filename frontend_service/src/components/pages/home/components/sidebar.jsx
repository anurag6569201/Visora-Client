import React, { useEffect, useState,useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons

import UserContext from "../../../../global/Context";

function MainSideBar() {
    const navigate = useNavigate();
    const location = useLocation(); // Get current route

    const { user } = useContext(UserContext);

    return (
        <div className="sidebar border-end col-md-3 col-lg-2 p-0 bg-body-tertiary">
            <div
                className="offcanvas-md offcanvas-end bg-body-tertiary"
                tabIndex="-1"
                id="sidebarMenu"
                aria-labelledby="sidebarMenuLabel"
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="sidebarMenuLabel">
                        Company Name
                    </h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        data-bs-target="#sidebarMenu"
                        aria-label="Close"
                    ></button>
                </div>

                <div className="offcanvas-body d-md-flex flex-column flex-shrink-0 p-3 pt-lg-3 overflow-y-auto sidebar">
                    {user?.role === "Student" && (
                        <ul className="nav nav-pills flex-column mb-auto">
                            <li className="nav-item">
                                <a 
                                    onClick={() => navigate("/app/discover")} 
                                    className={`nav-link ${location.pathname === "/app/discover" ? "active" : ""}`}
                                >
                                    <i className="bi bi-house-door me-2"></i> Discover
                                </a>
                            </li>
                            <li>
                                <a 
                                    onClick={() => navigate("/app/visions")} 
                                    className={`nav-link ${location.pathname === "/app/visions" ? "active" : "text-white"}`}
                                >
                                    <i className="bi bi-grid me-2"></i> Visions
                                </a>
                            </li>
                            <li>
                                <a 
                                    onClick={() => navigate("/app/orders")} 
                                    className={`nav-link ${location.pathname === "/app/orders" ? "active" : "text-white"}`}
                                >
                                    <i className="bi bi-table me-2"></i> Orders
                                </a>
                            </li>
                            <li>
                                <a 
                                    onClick={() => navigate("/app/products")} 
                                    className={`nav-link ${location.pathname === "/app/products" ? "active" : "text-white"}`}
                                >
                                    <i className="bi bi-grid me-2"></i> Products
                                </a>
                            </li>
                            <li>
                                <a 
                                    onClick={() => navigate("/app/customers")} 
                                    className={`nav-link ${location.pathname === "/app/customers" ? "active" : "text-white"}`}
                                >
                                    <i className="bi bi-people me-2"></i> Customers
                                </a>
                            </li>
                        </ul>
                    )}
                    {user?.role === "Developer" && (
                        <ul className="nav nav-pills flex-column mb-auto">
                            <li className="nav-item">
                                <a 
                                    onClick={() => navigate("/app/discover")} 
                                    className={`nav-link ${location.pathname === "/app/discover" ? "active" : ""}`}
                                >
                                    <i className="bi bi-house-door me-2"></i> Discover
                                </a>
                            </li>
                            <li>
                                <a 
                                    onClick={() => navigate("/app/dev/deploy")} 
                                    className={`nav-link ${location.pathname === "/app/dev/deploy" ? "active" : "text-white"}`}
                                >
                                    <i className="bi bi-cloud me-2"></i> Deploy
                                </a>
                            </li>
                            <li>
                                <a 
                                    onClick={() => navigate("/app/dev/editor")} 
                                    className={`nav-link ${location.pathname === "/app/dev/editor" ? "active" : "text-white"}`}
                                >
                                    <i className="bi bi-table me-2"></i> Visora Studio
                                </a>
                            </li>
                            <li>
                                <a 
                                    onClick={() => navigate("/app/visions")} 
                                    className={`nav-link ${location.pathname === "/app/visions" ? "active" : "text-white"}`}
                                >
                                    <i className="bi bi-grid me-2"></i> Visions
                                </a>
                            </li>
                            <li>
                                <a 
                                    onClick={() => navigate("/app/customers")} 
                                    className={`nav-link ${location.pathname === "/app/customers" ? "active" : "text-white"}`}
                                >
                                    <i className="bi bi-people me-2"></i> Customers
                                </a>
                            </li>
                        </ul>
                    )}
                    <hr />
                    <div className="dropdown">
                        <a
                            href="#"
                            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <img
                                src={user ? user.profile_picture : "Loading..."}
                                alt=""
                                width="32"
                                height="32"
                                className="rounded-circle me-2"
                            />
                            <strong>{user ? user.username : "Loading..."}</strong>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                            <li>
                                <a className="dropdown-item" href="#">
                                    New project...
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">
                                    Settings
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item"  onClick={() => navigate("/app/profile")}>
                                    Profile
                                </a>
                            </li>
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <a className="dropdown-item" onClick={() => navigate("/app/logout")}>
                                    Sign out
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainSideBar;
