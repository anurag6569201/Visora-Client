import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";

const LikeButton = ({ projectId }) => {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    const token = localStorage.getItem('authToken');
    
    if (!token) return null; // Avoids crashing when token is missing

    useEffect(() => {
        async function fetchLikes() {
            try {
                const response = await axios.get(`http://0.0.0.0:8001/projects/${projectId}/like/`, {
                    headers: { 'Authorization': token }
                });
                setLiked(response.data.is_liked);
                setLikes(response.data.total_likes);
            } catch (error) {
                console.error("Error fetching like data", error);
            }
        }
        fetchLikes();
    }, [projectId]);

    const handleLike = async () => {
        try {
            const response = await axios.post(
                `http://0.0.0.0:8001/projects/${projectId}/like/`, 
                {},
                {
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json',
                    },
                }
            );  
            setLiked(response.data.liked);
            setLikes(response.data.likes_count);
        } catch (error) {
            console.error("Error liking the project:", error);
        }
    };

    return (
        <button onClick={handleLike} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}>
            {liked ? <FaHeart color="red" size={20} /> : <FaRegHeart size={20} />}
            <span style={{ marginLeft: "5px", fontSize: "14px" }}>{likes}</span>
        </button>
    );
};

export default LikeButton;
