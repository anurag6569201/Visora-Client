import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Pagination, Spinner, Card, Row, Col, Badge, Form, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../assets/leaderboard/css/Leaderboard.css'
const Leaderboard = () => {
    const [scores, setScores] = useState([]);
    const [topThree, setTopThree] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchData = async (page = 1) => {
        setLoading(true);
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error("No auth token found");
            setLoading(false);
            return;
        }
    
        try {
            const headers = {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json"
            };
    
            const [mainData, topPlayers] = await Promise.all([
                axios.get(`http://localhost:8000/api/scores/?page=${page}`, { headers }),
                axios.get('http://localhost:8000/api/scores/?ordering=-score&page_size=3', { headers })
            ]);
            
            setScores(mainData.data.results);
            setTopThree(topPlayers.data.results);
            setTotalPages(Math.ceil(mainData.data.count / 10));
            setCurrentPage(page);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 50000);
        return () => clearInterval(interval);
    }, []);

    const handlePageChange = (page) => {
        fetchData(page);
    };

    const getRankColor = (rank) => {
        const colors = {
            1: 'warning',    // Gold
            2: 'secondary',  // Silver
            3: 'danger'      // Bronze
        };
        return colors[rank] || 'light';
    };

    const getRankLabel = (rank) => {
        const labels = {
            1: '#1',
            2: '#2',
            3: '#3'
        };
        return labels[rank] || `${rank}th`;
    };
    

    return (
        <div className="container mt-2">
            <h2 className="text-center mb-4">Visora Leaderboard</h2>
            {/* Top 3 Performers */}
            <Row className="mb-5 justify-content-center align-items-end">
                {topThree.map((player, index) => (
                    <Col
                    key={player.id}
                    md={3}
                    className={`d-flex ${index === 0 ? 'order-2' : index === 1 ? 'order-1' : 'order-3'}`}
                    >
                    <Card className={`w-100 ${index === 0 ? 'mb-0 elevated-card' : 'mb-4'}`}>
                        <Card.Body className="text-center d-flex flex-column justify-content-center align-items-center leaderboard_body">
                        <div className="image_space_leaderboard">
                            <img
                                src={player?.userpic ? `http://127.0.0.1:8000/media/${player.userpic}` : "default-avatar.png"}
                                alt="avatar"
                                className="rounded-circle avatar-rounder-card"
                                style={{ width: '130px' }}
                            />
                            <div className="badge_and_trophy">
                            <div className={`fs-1 text-${getRankColor(index + 1)}`}>
                                <i className="bi-trophy-fill" />
                            </div>
                        </div>
                        </div>

                        <div>

                            <div className="image_sapce_score">
                            <Badge pill bg={getRankColor(index + 1)} className="fs-6">
                                {getRankLabel(index + 1)}
                            </Badge>
                            <span className="fs-5 fw-bold leaderboard_score">{player.score}</span>
                            </div>
                            <Card.Title className="fs-5">{player.username}</Card.Title>
                            
                            <div className="text-muted m-0">
                            <i className="bi-clock-history me-2" />
                            {new Date(player.updated_at).toLocaleDateString()}
                            </div>
                        </div>
                        </Card.Body>
                    </Card>
                    </Col>
                ))}
                </Row>


            {/* Main Leaderboard Table */}
            <Card className="shadow">
                <Card.Body>
                    {loading ? (
                        <div className="text-center">
                            <Spinner animation="border" variant="primary" />
                        </div>
                    ) : (
                        <>
                            <Table hover responsive className="mb-0">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>Rank</th>
                                        <th>Player</th>
                                        <th>Score</th>
                                        <th>Last Updated</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {scores.map((entry, index) => {
                                        const globalRank = ((currentPage - 1) * 10) + index + 1;
                                        return (
                                            <tr key={entry.id}
                                            onClick={() => window.location.href = `/app/profile?username=${entry.username}&id=${entry.userid}`} style={{ cursor: "pointer" }} >
                                                <td style={{display:'flex',alignItems:'center',gap:'10px'}}><img
                                                        src={entry?.userpic ? `http://127.0.0.1:8000/media/${entry.userpic}` : "default-avatar.png"}
                                                        alt="avatar"
                                                        className="rounded-circle avatar-rounder-card"
                                                        style={{ width: '40px' }}
                                                    />
                                                    <Badge className='p-2' bg={getRankColor(globalRank)}>
                                                        {globalRank}
                                                    </Badge>
                                                </td>
                                                <td className="align-middle"><span>{entry.username}</span></td>
                                                <td className="align-middle"><span>{entry.score}</span></td>
                                                <td className="align-middle"><span>{new Date(entry.updated_at).toLocaleString()}</span></td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                            
                            <div className="d-flex justify-content-center mt-4">
                                <Pagination>
                                    <Pagination.Prev 
                                        disabled={currentPage === 1} 
                                        onClick={() => handlePageChange(currentPage - 1)}
                                    />
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <Pagination.Item
                                            key={i + 1}
                                            active={i + 1 === currentPage}
                                            onClick={() => handlePageChange(i + 1)}
                                        >
                                            {i + 1}
                                        </Pagination.Item>
                                    ))}
                                    <Pagination.Next 
                                        disabled={currentPage === totalPages} 
                                        onClick={() => handlePageChange(currentPage + 1)}
                                    />
                                </Pagination>
                            </div>
                        </>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default Leaderboard;