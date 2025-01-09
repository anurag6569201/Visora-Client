import { useNavigate } from 'react-router-dom';

function TopBar() {
    const navigate = useNavigate();
    return (
        <>
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 class="h2">Dashboard</h1>
                <div class="btn-toolbar mb-2 mb-md-0">
                    <div class="btn-group me-2">
                        <button type="button" class="btn btn-secondary crousal_heading_btn" onClick={() => navigate('/app/logout')}>Log-Out</button>
                    </div>
                </div>
                <ul class="navbar-nav flex-row d-md-none">
                    <li class="nav-item text-nowrap">
                        <button class="nav-link px-3 text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSearch"
                            aria-controls="navbarSearch" aria-expanded="false" aria-label="Toggle search">
                            <svg class="bi">
                                <use xlink:href="#search" />
                            </svg>
                        </button>
                    </li>
                    <li class="nav-item text-nowrap">
                        <button class="nav-link px-3 text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu"
                            aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                            <svg class="bi">
                                <use xlink:href="#list" />
                            </svg>
                        </button>
                    </li>
                </ul>

                <div id="navbarSearch" class="navbar-search w-100 collapse">
                    <input class="form-control w-100 rounded-0 border-0" type="text" placeholder="Search" aria-label="Search" />
                </div>
            </div>
        </>
    )
}
export default TopBar