import React from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation after logout
import '../../assets/landing/css/login.css';
import contact from '../../assets/landing/images/contact.svg';

function GLogout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/auth/logout/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${localStorage.getItem('authToken')}`, // Pass the auth token if required
                },
            });

            if (response.ok) {
                // Clear auth token and redirect to login page
                localStorage.removeItem('authToken');
                navigate('/login');
            } else {
                console.error('Logout failed:', await response.json());
                alert('An error occurred while logging out. Please try again.');
            }
        } catch (error) {
            console.error('Logout error:', error);
            alert('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <>
            <div className="container login_container px-4 pt-5 my-5">
                <div className="row">
                    <div className="col-md-6 d-flex justify-content-center" style={{ flexDirection: 'column' }}>
                        <h6>Logout?</h6>
                        <p>Are you sure you want to Logout?</p>
                        <button
                            className="btn btn-danger login_logging_btn"
                            onClick={handleLogout}
                        >
                            Sign Out
                        </button>
                    </div>
                    <div className="col-md-6 d-flex justify-content-center align-items-center">
                        <img src={contact} alt="Logout Illustration" width="80%" />
                    </div>
                </div>
                <hr />
            </div>
        </>
    );
}

export default GLogout;
