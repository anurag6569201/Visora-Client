import React, { useContext, useState, useEffect } from "react";
import '../../../assets/UserProfile/profile.css'

import UserContext from "../../../global/Context";

import "bootstrap-icons/font/bootstrap-icons.css";
import {
    MDBCol,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem
} from 'mdb-react-ui-kit';

import UserProfilePost
 from "./components/UserProfilePost";
const UserProfile = () => {

    const { user } = useContext(UserContext);
    const [socialLinks, setSocialLinks] = useState({});

    const fetchSocialLinks = async (userId) => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            return;
        }
        try {
            const response = await fetch(`http://127.0.0.1:8000/auth/user/social/${userId}/`, {
                method: "GET",
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data)
                setSocialLinks(data);
            } else {
                console.error("Failed to fetch social links", response.status);
            }
        } catch (error) {
            console.error("Error fetching social links:", error);
        }
    };

    useEffect(() => {
        if (user?.id) {
            fetchSocialLinks(user.id);
        }
    }, [user?.id]);

    return (
        <>
            <div className="container py-3 px-0">
                <div className="row">
                    <div className="col-md-4">
                        <MDBCard className="mb-4">
                            <MDBCardBody className="text-center p-2">
                                <MDBCardImage
                                    src={user ? user.profile_picture : "Loading..."}
                                    alt="avatar"
                                    className="rounded-circle"
                                    style={{ width: '130px' }}
                                    fluid />
                                <p className="text-muted mb-1 mt-3">{user ? user.role : "Student"}</p>
                                <p className="text-muted"><strong>Username : </strong>{user ? user.username : "Loading..."}</p>
                            </MDBCardBody>
                        </MDBCard>
                    </div>
                    <div className="col-md-8">
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Full Name</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{user ? user.first_name : "Loading..."} {user ? user.last_name : "Loading..."}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Email</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{user ? user.email : "Loading..."}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Phone</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{user ? user.phone_number : "Loading..."}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Date Joined</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{user ? user.date_joined : "Loading..."}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </div>

                </div>
                <div className="row">

                    <div className="col-md-4">
                        <MDBCardBody className="h-100">
                            <MDBListGroup flush className="rounded-3">
                                {socialLinks.website && (
                                    <MDBListGroupItem className="d-flex justify-content-left align-items-center p-3">
                                        <MDBIcon fas icon="globe fa-lg text-warning" />
                                        <MDBCardText><a href={socialLinks.website}>{socialLinks.website}</a></MDBCardText>
                                    </MDBListGroupItem>
                                )}
                                {socialLinks.github && (
                                    <MDBListGroupItem className="d-flex justify-content-left align-items-center p-3">
                                        <MDBIcon fab icon="github fa-lg" style={{ color: "#333333" }} />
                                        <MDBCardText><a href={socialLinks.github}>{socialLinks.github}</a></MDBCardText>
                                    </MDBListGroupItem>
                                )}
                                {socialLinks.twitter && (
                                    <MDBListGroupItem className="d-flex justify-content-left align-items-center p-3">
                                        <MDBIcon fab icon="twitter fa-lg" style={{ color: "#55acee" }} />
                                        <MDBCardText><a href={socialLinks.twitter}>{socialLinks.twitter}</a></MDBCardText>
                                    </MDBListGroupItem>
                                )}
                                {socialLinks.instagram && (
                                    <MDBListGroupItem className="d-flex justify-content-left align-items-center p-3">
                                        <MDBIcon fab icon="instagram fa-lg" style={{ color: "#ac2bac" }} />
                                        <MDBCardText><a href={socialLinks.instagram}>{socialLinks.instagram}</a></MDBCardText>
                                    </MDBListGroupItem>
                                )}
                                {socialLinks.linkedin && (
                                    <MDBListGroupItem className="d-flex justify-content-left align-items-center p-3">
                                        <MDBIcon fab icon="linkedin fa-lg" style={{ color: "#0077b5" }} />
                                        <MDBCardText><a href={socialLinks.linkedin}>{socialLinks.linkedin}</a></MDBCardText>
                                    </MDBListGroupItem>
                                )}
                                {socialLinks.youtube && (
                                    <MDBListGroupItem className="d-flex justify-content-left align-items-center p-3">
                                        <MDBIcon fab icon="youtube fa-lg" style={{ color: "#ff0000" }} />
                                        <MDBCardText><a href={socialLinks.youtube}>{socialLinks.youtube}</a></MDBCardText>
                                    </MDBListGroupItem>
                                )}
                                {socialLinks.medium && (
                                    <MDBListGroupItem className="d-flex justify-content-left align-items-center p-3">
                                        <MDBIcon fab icon="medium fa-lg" style={{ color: "#12100E" }} />
                                        <MDBCardText><a href={socialLinks.medium}></a>{socialLinks.medium}</MDBCardText>
                                    </MDBListGroupItem>
                                )}
                            </MDBListGroup>
                        </MDBCardBody>
                    </div>
                    <div className="col-md-8">
                        <MDBCard className="mb-4 h-100">
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Bio :</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="12">
                                        <MDBCardText className="text-muted">{socialLinks.bio}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </div>
                </div>
            </div>

            <div className="container px-0">
                <UserProfilePost/>
            </div>
        </>
    )

};

export default UserProfile;
