import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Pagination, Spinner, Card, Row, Col, Badge, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Link } from "react-router-dom";

const Leaderboard = () => {
    const [scores, setScores] = useState([]);
    const [topThree, setTopThree] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

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

    const handleSearch = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        if (!searchQuery.trim()) {
            setErrorMessage('Please enter a username');
            return;
        }

        try {
            const token = localStorage.getItem('authToken');
            const headers = {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json"
            };
            const response = await axios.get(
                `http://localhost:8000/api/users/?username=${searchQuery}`,
                { headers }
            );
            
            if (response.data.results.length > 0) {
                const user = response.data.results[0];
                navigate(`/profile/${user.username}`);
            } else {
                setErrorMessage('User not found');
            }
        } catch (error) {
            console.error('Search error:', error);
            setErrorMessage('Error searching for user');
        }
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
            1: '1st',
            2: '2nd',
            3: '3rd'
        };
        return labels[rank] || `${rank}th`;
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Game Leaderboard</h2>
            <div className="mb-5">
                <Form onSubmit={handleSearch}>
                    <Row className="justify-content-center">
                        <Col md={6}>
                            <div className="input-group">
                                <Form.Control
                                    type="text"
                                    placeholder="Search for a user..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button 
                                    className="btn btn-primary" 
                                    type="submit"
                                    disabled={!searchQuery.trim()}
                                >
                                    Search
                                </button>
                            </div>
                            {errorMessage && (
                                <Alert variant="danger" className="mt-2 mb-0">
                                    {errorMessage}
                                </Alert>
                            )}
                        </Col>
                    </Row>
                </Form>
            </div>
            {/* Top 3 Performers */}
            <Row className="mb-5 justify-content-center">
                {topThree.map((player, index) => (
                    <Col key={player.id} md={4} className="mb-3">
                        <Card 
                            className={`h-100 shadow-lg border-${getRankColor(index + 1)}`}
                            bg={index === 0 ? getRankColor(index + 1) : 'light'}
                            text={index === 0 ? 'white' : 'dark'}
                        >
                            <Card.Body className="text-center">
                                <Badge pill bg={getRankColor(index + 1)} className="mb-3">
                                    {getRankLabel(index + 1)}
                                </Badge>
                                <Card.Title>{player.username}</Card.Title> {/* FIXED HERE */}
                                <Card.Text>
                                    <span className="display-6">{player.score}</span>
                                    <br />
                                    <small className="text-muted">
                                        Last updated: {new Date(player.updated_at).toLocaleDateString()}
                                    </small>
                                </Card.Text>
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
                                                <td>
                                                    <Badge bg={getRankColor(globalRank)}>
                                                        {globalRank}
                                                    </Badge>
                                                </td>
                                                <td>{entry.username}</td>
                                                <td>{entry.score}</td>
                                                <td>{new Date(entry.updated_at).toLocaleString()}</td>
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