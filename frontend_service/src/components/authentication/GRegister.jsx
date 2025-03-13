import React, { useState } from 'react';
import axios from 'axios';
import '../../assets/landing/css/login.css';
import google from '../../assets/landing/images/google.webp';
import contact from '../../assets/landing/images/contact.svg';

import { useNavigate } from "react-router-dom";

function GRegister() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        username: '',
        phone: '',
        role: 'student',
        password1: '',
        password2: '',
    });

    const [profilePic, setProfilePic] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfilePic(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const data = new FormData();
        data.append('email', formData.email);
        data.append('first_name', formData.first_name);
        data.append('last_name', formData.last_name);
        data.append('username', formData.username);
        data.append('phone_number', formData.phone);
        data.append('role', formData.role);
        data.append('password1', formData.password1);
        data.append('password2', formData.password2);
        if (profilePic) {
            data.append('profile_picture', profilePic);
        }

        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/auth/registration/', // Update this if using a deployed API
                data,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            alert('Registration successful!');
            navigate("/login");
            
        } catch (error) {
            setError(error.response?.data || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-xl-12 col-lg-12">
                    <div className="border-0">
                        <div className="row g-0">
                            <div className="col-md-6 d-flex align-items-center gradient-bg p-4">
                                <img src={contact} alt="Contact illustration" className="img-fluid rounded-3" />
                            </div>

                            <div className="col-md-6">
                                <div className="card-body p-4 p-xl-5">
                                    <h3 className="mb-4 text-center fw-bold" style={{color:'#ffffff'}}>Create Account</h3>
                                    <p className="text-muted text-center mb-4">
                                        Already a member?
                                        <a href="/login" className="text-decoration-none ms-1" style={{color:'#712cf8'}}>Sign in here</a>
                                    </p>

                                    {error && <div className="alert alert-danger">{error}</div>}

                                    <form onSubmit={handleSubmit}>
                                        <div className="row g-3">
                                            <div className="col-12">
                                                <div className="form-floating">
                                                    <input type="email" className="form-control" name="email"
                                                        placeholder="name@example.com" required
                                                        value={formData.email} onChange={handleChange} />
                                                    <label>Email address</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-floating">
                                                    <input type="text" className="form-control" name="first_name"
                                                        placeholder="First Name" required
                                                        value={formData.first_name} onChange={handleChange} />
                                                    <label>First Name</label>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-floating">
                                                    <input type="text" className="form-control" name="last_name"
                                                        placeholder="Last Name" required
                                                        value={formData.last_name} onChange={handleChange} />
                                                    <label>Last Name</label>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="form-floating">
                                                    <input type="text" className="form-control" name="username"
                                                        placeholder="Username" required
                                                        value={formData.username} onChange={handleChange} />
                                                    <label>Username</label>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-floating">
                                                    <input type="tel" className="form-control" name="phone"
                                                        placeholder="Phone Number"
                                                        value={formData.phone} onChange={handleChange} />
                                                    <label>Phone Number</label>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-floating">
                                                    <select className="form-select" name="role" required
                                                        value={formData.role} onChange={handleChange}>
                                                        <option value="student">Student</option>
                                                        <option value="teacher">Teacher</option>
                                                        <option value="developer">Developer</option>
                                                        <option value="animator">Animator</option>
                                                        <option value="researcher">Researcher</option>
                                                    </select>
                                                    <label>Role</label>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-floating">
                                                    <input type="password" className="form-control" name="password1"
                                                        placeholder="Password" required
                                                        value={formData.password1} onChange={handleChange} />
                                                    <label>Password</label>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-floating">
                                                    <input type="password" className="form-control" name="password2"
                                                        placeholder="Confirm Password" required
                                                        value={formData.password2} onChange={handleChange} />
                                                    <label>Confirm Password</label>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="d-flex flex-column align-items-center">
                                                    <label className="btn btn-outline-primary upload_profile_pic_btn rounded-pill position-relative" style={{ color: '#712cf8', borderColor: '#712cf8' }}>
                                                        <input type="file" accept="image/*"
                                                            className="visually-hidden"
                                                            onChange={handleImageChange} />
                                                        <i className="bi bi-camera me-2"></i>
                                                        Upload Profile Picture
                                                    </label>
                                                    {preview && (
                                                        <div className="mt-3 position-relative">
                                                            <img src={preview} alt="Profile Preview"
                                                                className="img-thumbnail rounded-circle"
                                                                style={{ width: '100px', height: '100px' }} />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="col-12 d-grid mt-4">
                                                <button className="btn btn-primary account_creating_btn btn-lg rounded-pill"
                                                    type="submit" disabled={loading} style={{background:'#712cf8'}}>
                                                    {loading ? 'Creating Account...' : 'Create Account'}
                                                </button>
                                            </div>

                                            <div className="col-12 d-grid">
                                                <a href="https://theflavourlake.in/accounts/google/login/?process=login"
                                                    className="btn btn-outline-light btn-lg rounded-pill">
                                                    <img src={google} alt="Google" width="24" className="me-2" />
                                                    Sign up with Google
                                                </a>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GRegister;
