import React, { useState, useEffect,useContext } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";
import UserContext from "../../../../global/Context";

const LikeButton = ({ projectId }) => {
    const { user } = useContext(UserContext);
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    

    useEffect(() => {
        console.log("Fetching likes for project:", projectId);
        if (user) {
            async function fetchLikes() {
                try {
                    console.log("API Call: GET /projects/", projectId, "/like/");
                    const response = await axios.get(`http://0.0.0.0:8001/projects/${projectId}/like/`, {
                        headers: { 'Authorization': user.username }
                    });
                    console.log("API Response:", response.data);
                    setLiked(response.data.is_liked);
                    setLikes(response.data.total_likes);
                } catch (error) {
                    console.error("Error fetching like data", error);
                }
            }
            fetchLikes();
        } else {
            console.warn("User is not available yet.");
        }
    }, [projectId, user]); // Ensure user is in the dependency array
    

    const handleLike = async () => {
        try {
            const response = await axios.post(
                `http://0.0.0.0:8001/projects/${projectId}/like/`, 
                {},
                {
                    headers: {
                        'Authorization': user.username,
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
