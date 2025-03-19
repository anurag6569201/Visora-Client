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
    MDBBtn,
    MDBInput,
    MDBListGroup,
    MDBListGroupItem,
    MDBIcon
} from 'mdb-react-ui-kit';
import UserProfilePost from "./components/UserProfilePost";
import { useSearchParams } from "react-router-dom";

const UserProfile = () => {
    const [searchParams] = useSearchParams();
    const username = searchParams.get("username");
    const id = searchParams.get("id");
    
    const { user: contextUser } = useContext(UserContext);
    const [socialLinks, setSocialLinks] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editedSocialLinks, setEditedSocialLinks] = useState({});
    const token = localStorage.getItem('authToken');
    const [user, setUserData] = useState({});

    if (!token) {
        return;
    }
    const fetchUserData = async (userId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/auth/user/${userId}/`, {
                headers: { Authorization: `Token ${token}` },
            });
            if (response.ok) {
                const data = await response.json();
                setUserData(data);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };
    useEffect(() => {
        const id = searchParams.get("id");
        if (id) fetchUserData(id);
    }, [searchParams]);
    useEffect(() => {
        const id = searchParams.get("id");
        if (id) fetchSocialLinks(id);
    }, [id]);

    useEffect(() => {
        if (isEditing) {
            setEditedSocialLinks(socialLinks);
        }
    }, [isEditing, socialLinks]);

    const fetchSocialLinks = async (userId) => {
        const token = localStorage.getItem('authToken');
        if (!token) return;
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
                setSocialLinks(data);
            }
        } catch (error) {
            console.error("Error fetching social links:", error);
        }
    };

    const updateSocialLinks = async () => {
        const token = localStorage.getItem('authToken');
        if (!token || !user?.id) return;
        try {
            const id = searchParams.get("id");
            const response = await fetch(`http://127.0.0.1:8000/auth/user/social/${id}/`, {
                method: "PUT",
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedSocialLinks),
            });
            if (response.ok) {
                const data = await response.json();
                setSocialLinks(data);
                setIsEditing(false);
            }
        } catch (error) {
            console.error("Error updating social links:", error);
        }
    };

    const handleInputChange = (field, value) => {
        setEditedSocialLinks(prev => ({ ...prev, [field]: value }));
    };

    return (
        <>
            <div className="container py-3 px-0">
                <div className="row">
                    <div className="col-md-4">
                        <MDBCard className="mb-4">
                            <MDBCardBody className="text-center p-2">
                            <span>
                                <MDBCardImage
                                    src={user?.profile_picture ? `http://127.0.0.1:8000/${user.profile_picture}` : "default-avatar.png"}
                                    alt="avatar"
                                    className="rounded-circle avatar-rounder-card"
                                    style={{ width: '130px' }}
                                    fluid 
                                />
                                {contextUser?.username === user?.username && ( // Use `contextUser` instead of `user`
                                    <button onClick={() => setIsEditing(!isEditing)} className='edit-profile-btn iactive mb-2'>
                                        {isEditing ? <i className="bi bi-twitter-x"></i> : <i className="bi bi-pencil-fill"></i>}
                                    </button>
                                )}
                            </span>
                                <p className="text-muted mb-1 mt-3">{user?.role || "Student"}</p>
                                <p className="text-muted"><strong>Username : </strong>{user?.username || "Loading..."}</p>
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
                                {Object.entries({
                                    website: { icon: 'website', color: 'warning' },
                                    github: { icon: 'github', color: '#333333' },
                                    twitter: { icon: 'twitter', color: '#55acee' },
                                    instagram: { icon: 'instagram', color: '#ac2bac' },
                                    linkedin: { icon: 'linkedin', color: '#0077b5' },
                                    youtube: { icon: 'youtube', color: '#ff0000' },
                                    medium: { icon: 'medium', color: '#12100E' }
                                }).map(([field, { icon, color }]) => (
                                    socialLinks[field] || isEditing ? (
                                        <MDBListGroupItem key={field} className="d-flex align-items-center p-3">
                                            {isEditing ? (
                                                <MDBInput
                                                    type="text"
                                                    value={editedSocialLinks[field] || ''}
                                                    onChange={(e) => handleInputChange(field, e.target.value)}
                                                    label={`${field.charAt(0).toUpperCase() + field.slice(1)} URL`}
                                                />
                                            ) : (
                                                <span style={{display:'flex',alignItems:'center',width:'100%',gap:'20px'}}>
                                                    <span><strong>{icon}</strong> : </span>
                                                    <a href={socialLinks[field]} target="_blank" rel="noopener noreferrer">
                                                        {socialLinks[field].length > 20 ? socialLinks[field].slice(0, 17) + "..." : socialLinks[field]}
                                                    </a>
                                                </span>
                                            )}
                                        </MDBListGroupItem>
                                    ) : null
                                ))}
                            </MDBListGroup>
                            {isEditing && (
                                <button onClick={updateSocialLinks} className='btn edit-profile-btn mt-3'>
                                    Save Changes
                                </button>
                            )}
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
                                        {isEditing ? (
                                            <textarea
                                                className="form-control"
                                                value={editedSocialLinks.bio || ''}
                                                onChange={(e) => handleInputChange('bio', e.target.value)}
                                                rows="4"
                                            />
                                        ) : (
                                            <MDBCardText className="text-muted">{socialLinks.bio}</MDBCardText>
                                        )}
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </div>
                </div>
            </div>
            <div className="container px-0">
                <UserProfilePost userData={username} userid={id} />
            </div>
        </>
    )

};

export default UserProfile;
