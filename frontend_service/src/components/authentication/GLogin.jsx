import React, { useState } from 'react';
import '../../assets/landing/css/login.css';
import google from '../../assets/landing/images/google.webp';
import contact from '../../assets/landing/images/contact.svg';
import { useNavigate } from 'react-router-dom';

function GLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent form submission

        const payload = {
            email: email,
            password: password,
            remember: rememberMe,
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                // Handle successful login (e.g., save token, redirect user)
                localStorage.setItem('authToken', data.key); // Save auth token to localStorage
                navigate('/app/home');
            } else {
                const errorData = await response.json();
                setError(errorData.non_field_errors || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <>
            <div className="container login_container px-4 pt-5 my-5">
                <div className="row">
                    <div className="col-md-6 d-flex justify-content-center" style={{ flexDirection: 'column' }}>
                        <h6>
                            New Member? <a className="logging_register" href="/signup">Register Here</a>
                        </h6>
                        <form onSubmit={handleLogin}>
                            <div className="row">
                                <div className="col-md-6">
                                    <p>
                                        <label htmlFor="email">Email:</label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Please Enter Your Email"
                                            autoComplete="username"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            id="email"
                                        />
                                    </p>
                                </div>
                                <div className="col-md-6">
                                    <p>
                                        <label htmlFor="password">Password:</label>
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Please Enter Your Password"
                                            autoComplete="current-password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            id="password"
                                        />
                                    </p>
                                </div>
                            </div>
                            <p className="login_remember">
                                <label htmlFor="remember">Remember Me:</label>
                                <input
                                    type="checkbox"
                                    name="remember"
                                    id="remember"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                            </p>
                            {error && <p className="text-danger">{error}</p>}
                            <p className="logging_forget">
                                <a href="/accounts/password/reset/">Forgot your password?</a>
                            </p>
                            <button className="btn btn-secondary crousal_heading_btn" type="submit">
                                Login
                            </button>
                        </form>
                        <p className="text-center my-4">Or</p>
                        <p className="text-center">
                            <a
                                href="https://theflavourlake.in/accounts/google/login/?process=login"
                                className="login_by_google"
                            >
                                <img src={google} alt="Google" style={{ width: '26px', marginRight: '8px' }} />
                                Login with Google
                            </a>
                        </p>
                    </div>
                    <div className="col-md-6 d-flex justify-content-center align-items-center">
                        <img src={contact} alt="Contact Illustration" width="80%" />
                    </div>
                </div>
                <hr />
            </div>
        </>
    );
}

export default GLogin;
