import React, { useState } from 'react';
import '../../assets/landing/css/login.css';
import google from '../../assets/landing/images/google.webp';
import contact from '../../assets/landing/images/contact.svg';
import { useNavigate } from 'react-router-dom';

function GLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent form submission

        const payload = {
            username: username,
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
                        </h6><br />
                        <form onSubmit={handleLogin}>
                            <div className="row">
                                <div className="col-md-6">
                                    <p>
                                        <label htmlFor="username">Username:</label>
                                        <input
                                            type="username"
                                            name="username"
                                            placeholder="Please Enter Your Username"
                                            autoComplete="username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                            id="username"
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
                                <label htmlFor="remember" style={{display:'inline-block'}}>Remember Me:</label>
                                <input
                                    type="checkbox"
                                    name="remember"
                                    id="remember"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    style={{width:'min-content',marginBottom:'0'}}
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
                        <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }} className="mt-4 mb-4">
                            <span style={{ width: '40%', margin: '0 10px', borderTop: '1px solid #cfd0d1' }}></span>
                            <span>Or</span>
                            <span style={{ width: '40%', margin: '0 10px', borderTop: '1px solid #cfd0d1' }}></span>
                        </p>
                        <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span className="login_by_google">
                                <a style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center' }} href="https://theflavourlake.in/accounts/google/login/?process=login">
                                    <img loading="lazy" style={{ width: '26px' }} src={google} alt="Google" />
                                    Google
                                </a>
                            </span>
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
