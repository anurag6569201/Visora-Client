import React from "react";
import { useNavigate } from 'react-router-dom';

function MainSideBar() {
    const navigate = useNavigate();
    return (
        <>
            <div class="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
                <div class="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu"
                    aria-labelledby="sidebarMenuLabel">
                    <div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="sidebarMenuLabel">Company name</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu"
                            aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body d-md-flex flex-column flex-shrink-0 p-3 pt-lg-3 overflow-y-auto sidebar">
                        <ul class="nav nav-pills flex-column mb-auto">
                            <li class="nav-item">
                                <a  onClick={() => navigate('/app/home')} class="nav-link active" aria-current="page">
                                    <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#home" /></svg>
                                    Home
                                </a>
                            </li>
                            <li>
                                <a  onClick={() => navigate('/app/dashboard')} class="nav-link text-white">
                                    <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#speedometer2" /></svg>
                                    Dashboard
                                </a>
                            </li>
                            <li>
                                <a href="#" class="nav-link text-white">
                                    <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#table" /></svg>
                                    Orders
                                </a>
                            </li>
                            <li>
                                <a href="#" class="nav-link text-white">
                                    <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#grid" /></svg>
                                    Products
                                </a>
                            </li>
                            <li>
                                <a href="#" class="nav-link text-white">
                                    <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#people-circle" /></svg>
                                    Customers
                                </a>
                            </li>
                        </ul>
                        <hr />
                        <div class="dropdown">
                            <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2" />
                                <strong>mdo</strong>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
                                <li><a class="dropdown-item" href="#">New project...</a></li>
                                <li><a class="dropdown-item" href="#">Settings</a></li>
                                <li><a class="dropdown-item" href="#">Profile</a></li>
                                <li><hr class="dropdown-divider" /></li>
                                <li><a class="dropdown-item"  onClick={() => navigate('/app/logout')}>Sign out</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainSideBar