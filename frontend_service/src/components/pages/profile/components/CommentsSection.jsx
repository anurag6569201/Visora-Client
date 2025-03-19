import React, { useState, useEffect } from "react";
import axios from "axios";

const Comments = ({ projectId, userToken, setCommentsCount }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://0.0.0.0:8001/projects/${projectId}/comments/`);
            setComments(response.data);
            setCommentsCount(response.data.length); // Update count in parent
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    const handleCommentSubmit = async () => {
        if (!newComment.trim()) return;

        try {
            const response = await axios.post(
                `http://0.0.0.0:8001/projects/${projectId}/comments/`,
                { text: newComment },
                { headers: { Authorization: `${userToken}` } }
            );
            setComments([response.data, ...comments]);
            setCommentsCount(comments.length + 1); // Increment count in parent
            setNewComment("");
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };

    return (
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
                    <div className="comment-content">
                        <div className="comment-header">
                            <span className="username">{comment.username}</span>
                            <span className="timestamp">{new Date(comment.created_at).toLocaleString()}</span>
                        </div>
                        <p className="comment-text" style={{ margin: '0' }}>{comment.text}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Comments;
