import React, { useEffect, useState } from 'react';
import '../../assets/landing/css/login.css';
import contact from '../../assets/landing/images/contact.svg';

function GPasswordResetDone() {
    const [countdown, setCountdown] = useState(7);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown === 1) {
                    clearInterval(interval);
                    window.location.href = "/accounts/login/"; // Adjust the URL as needed
                }
                return prevCountdown - 1;
            });
        }, 1000);

        return () => clearInterval(interval); // Cleanup on component unmount
    }, []);

    return (
        <>
            <div className="container login_container px-4 pt-5 my-5">
                <div className="row">
                    <div className="col-md-6 d-flex justify-content-center" style={{ flexDirection: 'column' }}>
                        <h6>Email Sent Successfully</h6>
                        <form>
                            <p>
                                We have sent you an email. If you have not received it, please check your spam folder.
                                Otherwise, contact us if you do not receive it in a few minutes.
                            </p>
                            <button className="login_logging_btn" style={{ pointerEvents: 'none' }}>
                                Redirecting... <span className="logging_timer">{countdown}</span>
                            </button>
                        </form>
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

export default GPasswordResetDone;
