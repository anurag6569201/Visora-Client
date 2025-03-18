import React, { useState, useEffect, useRef, memo } from "react";
import { FaComment } from "react-icons/fa";
import LikeButton from "./LikeButton";
import { Link } from "react-router-dom";

const ShowCase = memo(({ project, style }) => {
    const [showIframe, setShowIframe] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "100px" }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <Link to={`/app/discover/${project.id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <div ref={containerRef} className="showcase-item" style={{ ...style, padding: "10px", position: "relative" }}>
                <h6>{project.name.charAt(0).toUpperCase() + project.name.slice(1)}</h6>

                <div style={{
                    width: "100%", height: "250px", borderRadius: "10px", overflow: "hidden", background: "#f0f0f0",
                }}>
                    {isVisible ? (
                        !showIframe ? (
                            <img
                                src={project.thumbnail || "https://via.placeholder.com/300x250?text=Preview"}
                                alt="Preview"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                        ) : (
                            <iframe
                                title={project.name}
                                sandbox="allow-scripts allow-same-origin"
                                srcDoc={project.combined_html}
                                style={{ width: "100%", height: "100%", borderRadius: "10px", border: "none" }}
                            />
                        )
                    ) : null}
                </div>

                {/* Like & Comment Buttons */}
                <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
                    <LikeButton projectId={project.id} />

                    <button style={{ marginLeft: "15px", background: "none", border: "none", cursor: "pointer" }}>
                        <FaComment size={20} />
                    </button>
                </div>
            </div>
        </Link>
    );
});

export default ShowCase;
