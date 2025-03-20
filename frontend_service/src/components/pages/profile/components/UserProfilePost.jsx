import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import '../../../../assets/UserProfile/ProfilePost/ProfilePost.css'

import ShowCase from "./ShowCase";
import UserContext from "../../../../global/Context";
import { useSearchParams } from "react-router-dom";

const UserProfilePost = ({userData,userid}) => {
  const [activeTab, setActiveTab] = useState("showcase");
  const [projects, setProjects] = useState([]);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const { user: contextUser } = useContext(UserContext);
  const [searchParams] = useSearchParams();
  const username_route = searchParams.get("username");
  const token = localStorage.getItem('authToken');
  if (!token) {
      return;
  }


  useEffect(() => {
    axios
      .get("http://0.0.0.0:8001/api/projects/", {
        headers: {
          Authorization: `${userData}`,  // 🔥 Fix: Added 'Token' prefix
          "Content-Type": "application/json",
        },
      })
      .then((response) => setProjects(response.data.projects))
      .catch((err) => console.error("Error fetching projects:", err));
  
    axios
      .get(`http://127.0.0.1:8000/user/${userid}/stats/`, {
        headers: { Authorization: `Token ${token}` }, // 🔥 Fix here too
      })
      .then((response) => {
        setFollowers(response.data.followers);
        setFollowing(response.data.following);
        setIsFollowing(response.data.isFollowing);
      })
      .catch((err) => console.error("Error fetching user stats:", err));
  }, []);
  
  const handleFollowToggle = () => {
    const url = isFollowing
      ? `http://127.0.0.1:8000/unfollow/${userid}/`
      : `http://127.0.0.1:8000/follow/${userid}/`;
  
    axios
      .post(url, {}, { headers: { Authorization: `Token ${token}` } })
      .then(() => {
        // ✅ Instead of manually toggling, refetch stats
        axios
          .get(`http://127.0.0.1:8000/user/${userid}/stats/`, {
            headers: { Authorization: `Token ${token}` },
          })
          .then((response) => {
            setFollowers(response.data.followers);
            setFollowing(response.data.following);
            setIsFollowing(response.data.isFollowing);
          })
          .catch((err) => console.error("Error refetching stats:", err));
      })
      .catch((err) => console.error("Error following/unfollowing:", err));
  };
  
  return (
    <div className="profile-container py-2">
      <div className="profile-top-bar border">
        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-number text-light">{followers}</span>
            <span className="stat-label text-light">Followers</span>
          </div>
          <div className="stat-item">
            <span className="stat-number text-light">{following}</span>
            <span className="stat-label text-light">Following</span>
          </div>
        </div>

        <div className="profile-actions">
        {contextUser?.username != username_route && (
          <button className={`btn ${isFollowing ? "btn-secondary" : "btn-primary"}`} onClick={handleFollowToggle}>
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
          )}
          <button className="btn btn-primary">
            <i className="bi bi-three-dots"></i>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="profile-tabs">
        <button
          className={`tab-item ${activeTab === 'showcase' ? 'active' : ''}`}
          onClick={() => setActiveTab('showcase')}
        >
          Showcase
        </button>
        <button
          className={`tab-item ${activeTab === 'popular' ? 'active' : ''}`}
          onClick={() => setActiveTab('popular')}
        >
          Popular
        </button>
        <button
          className={`tab-item ${activeTab === 'tags' ? 'active' : ''}`}
          onClick={() => setActiveTab('tags')}
        >
          Tags
        </button>
        <button
          className={`tab-item ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          About
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'showcase' && (
          <div className="showcase-grid">
            {projects.map((project, index) => (
              <ShowCase key={project.id || index} project={project} />
            ))}
          </div>
        )}



        {activeTab === 'popular' && (
          <div className="popular-posts">
            {/* Add popular posts content */}
          </div>
        )}

        {activeTab === 'tags' && (
          <div className="tag-cloud">
            <span className="tag">Web Development</span>
            <span className="tag">Design</span>
            <span className="tag">Programming</span>
            <span className="tag">Technology</span>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="about-section">
            {/* Add about content */}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfilePost;
