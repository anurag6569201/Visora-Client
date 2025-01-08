import React from 'react';
import '../../assets/landing/css/login.css'
import contact from '../../assets/landing/images/contact.svg'

function GPasswordChange() {
    return (
        <>
            <div className="container login_container px-4 pt-5 my-5">
                <div className="row">
                    <div className='col-md-6 d-flex justify-content-center ' style={{ flexDirection: 'column' }}>
                        <h6>
                            Reset Your Password
                        </h6>
                        <form method="post" action="/accounts/password/change/">
                            <p>
                                <label for="id_oldpassword">Current Password:</label>
                                <input type="password" name="oldpassword" placeholder="Current Password" autocomplete="current-password"
                                    required id="id_oldpassword"/>
                            </p>
                            <p>
                                <label for="id_password1">New Password:</label>
                                <input type="password" name="password1" placeholder="New Password" autocomplete="new-password" required
                                    aria-describedby="id_password1_helptext" id="id_password1"/>
                                    <span class="helptext" id="id_password1_helptext">
                                        <ul>
                                            <li>Your password can’t be too similar to your other personal information.</li>
                                            <li>Your password must contain at least 8 characters.</li>
                                            <li>Your password can’t be a commonly used password.</li>
                                            <li>Your password can’t be entirely numeric.</li>
                                        </ul>
                                    </span>
                            </p>
                            <p>
                                <label for="id_password2">New Password (again):</label>
                                <input type="password" name="password2" placeholder="New Password (again)" required id="id_password2"/>
                            </p>
                            <button class="login_logging_btn mb-2" type="submit"> Change Password </button>
                            <a href="/accounts/password/reset/">Forgot Password?</a>
                        </form>
                    </div>
                    <div className="col-md-6 d-flex justify-content-center align-items-center">
                        <img src={contact} alt="" width="80%" />
                    </div>
                </div>
                <hr />
            </div>
        </>
    );
}

export default GPasswordChange;
