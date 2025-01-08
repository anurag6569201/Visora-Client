import React from 'react';
import '../../assets/landing/css/login.css'
import google from '../../assets/landing/images/google.webp'
import contact from '../../assets/landing/images/contact.svg'

function GRegister() {
    return (
        <>
            <div className="container login_container px-4 pt-5 my-5">
                <div className="row">
                    <div className='col-md-6 d-flex justify-content-center ' style={{flexDirection:'column'}}>
                        <h6>
                            Already a member? <a className="logging_register" href="/login">Login Here</a>
                        </h6>
                        <form method="post" action="/accounts/signup/">
                            <div className="row">
                                <div className="col-md-6">
                                    <p>
                                        <label htmlFor="id_email">Email:</label>
                                        <input type="email" name="email" placeholder="Email address" autoComplete="email" maxLength="320" required id="id_email" />
                                    </p>
                                </div>
                                <div className="col-md-6">
                                    <p>
                                        <label htmlFor="id_username">Username:</label>
                                        <input type="text" name="username" placeholder="Username" autoComplete="username" minLength="1" maxLength="150" required id="id_username" />
                                    </p>
                                </div>
                                <div className="col-md-6">
                                    <p>
                                        <label htmlFor="id_password1">Password:</label>
                                        <input type="password" name="password1" placeholder="Password" autoComplete="new-password" required aria-describedby="id_password1_helptext" id="id_password1" />
                                    </p>
                                </div>
                                <div className="col-md-6">
                                    <p>
                                        <label htmlFor="id_password2">Password (again):</label>
                                        <input type="password" name="password2" placeholder="Password (again)" autoComplete="new-password" required id="id_password2" />
                                    </p>
                                </div>
                            </div>
                            <button className="btn btn-secondary crousal_heading_btn" type="submit">Register</button>
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
                        </form>
                    </div>
                    <div className="col-md-6 d-flex justify-content-center align-items-center">
                        <img src={contact}  alt="" width="80%"/>
                    </div>
                </div>
                <hr />
            </div>
        </>
    );
}

export default GRegister;
