import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Badge, Spinner, Alert, ListGroup } from "react-bootstrap";
import axios from "axios";

export default function RequestDetails() {
  const { id } = useParams(); // Extract request ID from URL
  const [request, setRequest] = useState(null);
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Fetching request for ID:", id);
    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("⚠️ You must be logged in to view this request.");
      setLoading(false);
      return;
    }

    axios
      .get(`http://127.0.0.1:8000/requests/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        console.log("Fetched Data:", res.data);
        setRequest(res.data);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setError("❌ Failed to load request details.");
      });

    axios
      .get(`http://127.0.0.1:8000/contributions/?request=${id}`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => setContributions(res.data))
      .catch(() => setContributions([]))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner animation="border" className="d-block mx-auto my-4" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!request) return <Alert variant="warning">⚠️ No data found!</Alert>;

  return (
    <Container className="mt-4">
      <h2 className="mb-4">📝 Request Details</h2>
      <Card className="shadow-lg p-4">
        <h3 className="text-primary">{request.title}</h3>
        <div className="mb-3">
          <Badge bg="secondary">{request.category}</Badge>
          <Badge className="ms-2" bg={request.status === "completed" ? "success" : "warning"}>
            {request.status}
          </Badge>
        </div>
        <p className="text-muted">{request.description}</p>
        <p><strong>Difficulty:</strong> {request.difficulty}</p>
        <p><strong>Deadline:</strong> {request.deadline || "No Deadline"}</p>
        <p><strong>Created By:</strong> {request.created_by?.username || "Unknown"}</p>
        <div className="mt-3">
          <strong>Tags:</strong>
          {request.tags.map((tag, index) => (
            <Badge key={index} bg="info" className="ms-1">{tag}</Badge>
          ))}
        </div>
      </Card>
      
      <h4 className="mt-4">💡 Contributions</h4>
      {contributions.length > 0 ? (
        <ListGroup className="mt-2">
          {contributions.map((contribution) => (
            <ListGroup.Item key={contribution.id} className="d-flex justify-content-between align-items-center">
              <div>
                <a href={contribution.animation_link} target="_blank" rel="noopener noreferrer" className="fw-bold">
                  {contribution.description}
                </a>
                <p className="text-muted mb-0">By {contribution.developer.username}</p>
              </div>
              <Badge bg="success">👍 {contribution.likes}</Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <Alert variant="info" className="mt-3">No contributions yet.</Alert>
      )}
    </Container>
  );
}
