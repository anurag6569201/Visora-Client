import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import '../../../../assets/UserProfile/ProfilePost/ProfilePost.css'

function UserProfilePost() {
  const [activeTab, setActiveTab] = useState("showcase");

  return (
    <div className="profile-container py-2">
      <div className="profile-top-bar border">
        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-number text-light">1.2k</span>
            <span className="stat-label text-light">Followers</span>
          </div>
          <div className="stat-item">
            <span className="stat-number text-light">892</span>
            <span className="stat-label text-light">Following</span>
          </div>
        </div>
        
        <div className="profile-actions">
          <button className="btn btn-primary">Follow</button>
          <button className="btn btn-primary">
            <i class="bi bi-three-dots"></i>
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
            {/* Add your showcase content here */}
            <div className="showcase-item">Project 1</div>
            <div className="showcase-item">Project 2</div>
            <div className="showcase-item">Project 3</div>
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
