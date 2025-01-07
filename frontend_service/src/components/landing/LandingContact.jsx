import React from 'react';

function LandingContact() {
    return (
        <>
            <div class="container px-4 pt-5 my-5 landing_contact_us">
                <h2 class="text-center mb-4">Contact Us</h2>
                <form action="/submit" method="POST">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="name" class="form-label">Full Name</label>
                            <input type="text" class="form-control" id="name" name="name" required />
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="email" class="form-label">Email Address</label>
                            <input type="email" class="form-control" id="email" name="email" required />
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="subject" class="form-label">Subject</label>
                        <input type="text" class="form-control" id="subject" name="subject" required />
                    </div>

                    <div class="mb-3">
                        <label for="message" class="form-label">Message</label>
                        <textarea class="form-control" id="message" name="message" rows="4" required ></textarea>
                    </div>

                    <button type="submit" class="btn btn-secondary crousal_heading_btn">Send Message</button>
                </form>
            </div>

        </>

    )
}

export default LandingContact