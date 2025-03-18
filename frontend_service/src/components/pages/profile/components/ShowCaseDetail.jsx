import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../../../assets/discover/css/showcasedeatil.css";
import LikeButton from "./LikeButton";
import QuizSection from "./QuizSection";
const ShowCaseDetail = () => {
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [combinedHTML, setCombinedHTML] = useState("");
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [showComments, setShowComments] = useState(true);
    const [activeTab, setActiveTab] = useState('theory');

    // Dummy data
    const dummyData = {
        comments: [
            { id: 1, user: "John", text: "Great project!", likes: 12, timestamp: "2 hours ago" },
            { id: 2, user: "Sarah", text: "Very inspiring 👏", likes: 8, timestamp: "4 hours ago" }
        ],
        quiz: {
            question: "What's the main purpose of this project?",
            options: ["Learning React", "CSS Animation", "Web Development", "All of the above"],
            correct: 3
        },
        theory: [
            { title: "Introduction", content: "This project demonstrates advanced CSS techniques..." },
            { title: "Key Concepts", content: "Flexbox, Grid, and Animation principles..." }
        ],
        examples: [
            { title: "Example 1", content: "Hover effects implementation..." },
            { title: "Example 2", content: "Responsive layout techniques..." }
        ]
    };

    useEffect(() => {
        // Simulated API call
        setTimeout(() => {
            setProject({
                id: projectId,
                name: "Sample Project",
                description: "A fantastic web development showcase",
                total_likes: 45,
                files: []
            });
            setComments(dummyData.comments);
            setLoading(false);
        }, 1000);
    }, [projectId]);

    // Rest of your existing useEffect and file loading logic...

    const handleCommentSubmit = () => {
        if (newComment.trim() === "") return;
        setComments([{ 
            id: comments.length + 1, 
            user: "You", 
            text: newComment, 
            likes: 0, 
            timestamp: "Just now" 
        }, ...comments]);
        setNewComment("");
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (!project) return <div className="error">Project not found!</div>;

    return (
        <div className="showcase-container mt-2">
            <div className="project-preview">
                <iframe
                    title={project.name}
                    sandbox="allow-scripts allow-same-origin"
                    srcDoc={combinedHTML}
                    className="project-iframe"
                />
            </div>

            <div className="content-wrapper">
                <div className="sidebar">
                    <div className="tabs">
                        <button 
                            className={activeTab === 'theory' ? 'active' : ''}
                            onClick={() => setActiveTab('theory')}
                        >
                            Theory
                        </button>
                        <button 
                            className={activeTab === 'examples' ? 'active' : ''}
                            onClick={() => setActiveTab('examples')}
                        >
                            Examples
                        </button>
                    </div>

                    {activeTab === 'theory' ? (
                        <div className="theory-content">
                            {dummyData.theory.map((section, index) => (
                                <div key={index} className="theory-card">
                                    <h4>{section.title}</h4>
                                    <p>{section.content}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="examples-content">
                            {dummyData.examples.map((example, index) => (
                                <div key={index} className="example-card">
                                    <h4>{example.title}</h4>
                                    <p>{example.content}</p>
                                    <button className="demo-btn">View Demo</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="main-content">
                    <div className="project-info">
                        <h1>{project.name}</h1>
                        <p className="description">{project.description}</p>
                        <div className="stats">
                            <LikeButton projectId={project.id} />
                            <button 
                                className="comments-toggle"
                                onClick={() => setShowComments(!showComments)}
                            >
                                {comments.length} Comments {showComments ? '▼' : '▶'}
                            </button>
                        </div>
                    </div>

                    {showComments && (
                        <div className="comments-section">
                            <div className="comment-input">
                                <input
                                    type="text"
                                    placeholder="Add a comment..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                />
                                <button onClick={handleCommentSubmit}>Comment</button>
                            </div>
                            {comments.map(comment => (
                                <div key={comment.id} className="comment">
                                    <div className="user-avatar">{comment.user[0]}</div>
                                    <div className="comment-content">
                                        <div className="comment-header">
                                            <span className="username">{comment.user}</span>
                                            <span className="timestamp">{comment.timestamp}</span>
                                        </div>
                                        <p className="comment_text">{comment.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <QuizSection/>
                </div>
            </div>
        </div>
    );
};

export default ShowCaseDetail;