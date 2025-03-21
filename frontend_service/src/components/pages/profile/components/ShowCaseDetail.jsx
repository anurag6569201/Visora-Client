import React, { useState, useEffect,useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../../../assets/discover/css/showcasedeatil.css";
import LikeButton from "./LikeButton";
import QuizSection from "./QuizSection";
import Comments from "./CommentsSection";
import UserContext from "../../../../global/Context";

const ShowCaseDetail = () => {
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [combinedHTML, setCombinedHTML] = useState("");
    const [activeTab, setActiveTab] = useState('comments');
    const { user } = useContext(UserContext);
    const [commentsCount, setCommentsCount] = useState(0);

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
        const fetchProject = async () => {
            try {
                const response = await axios.get(`http://0.0.0.0:8001/api/projects/${projectId}/`);
                setProject(response.data);
                if (response.data?.files?.length) {
                    await fetchFiles(response.data.files);
                }
            } catch (error) {
                console.error("Error fetching project:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchFiles = async (files) => {
            let htmlContent = "";
            let cssContent = "";
            let jsContent = "";

            await Promise.all(files.map(async (file) => {
                try {
                    const fileResponse = await axios.get(`http://0.0.0.0:8001${file.file}`);
                    if (file.file.endsWith(".html")) {
                        htmlContent += fileResponse.data;
                    } else if (file.file.endsWith(".css")) {
                        cssContent += `<style>${fileResponse.data}</style>`;
                    } else if (file.file.endsWith(".js")) {
                        jsContent += `<script>${fileResponse.data}</script>`;
                    }
                } catch (err) {
                    console.error(`Error loading file ${file.file}:`, err);
                }
            }));

            setCombinedHTML(`<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>${project?.name || "Preview"}</title>
                    ${cssContent}
                </head>
                <body>
                    ${htmlContent}
                    ${jsContent}
                </body>
                </html>`);
        };

        fetchProject();
    }, [projectId]);


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
                <div className="main-content">
                    <div className="project-info">
                        <h1>{project.name}</h1>
                        <p className="description">{project.description}</p>
                        <div className="stats">
                            <LikeButton projectId={project.id} />
                        </div>
                    </div>

                    <div className="tabs-container">
                        <div className="tabs">
                            <button 
                                className={activeTab === 'comments' ? 'active' : ''}
                                onClick={() => setActiveTab('comments')}
                            >
                                Comments ({commentsCount})
                            </button>
                            <button 
                                className={activeTab === 'quiz' ? 'active' : ''}
                                onClick={() => setActiveTab('quiz')}
                            >
                                Quiz
                            </button>
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

                        <div className="tab-content">
                            {activeTab === 'comments' && (
                                <Comments projectId={project.id} userToken={user.username} setCommentsCount={setCommentsCount}/>
                            )}

                            {activeTab === 'quiz' && <QuizSection projectId={project.id}/>}

                            {activeTab === 'theory' && (
                                <div className="theory-content">
                                    {dummyData.theory.map((section, index) => (
                                        <div key={index} className="theory-card">
                                            <h4>{section.title}</h4>
                                            <p>{section.content}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'examples' && (
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowCaseDetail;