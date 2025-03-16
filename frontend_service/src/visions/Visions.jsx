import { useEffect, useState } from "react";
import { Container, Table, Badge, Form, InputGroup, Button, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Visions() {
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("⚠️ You must be logged in to view requests.");
      setLoading(false);
      return;
    }

    axios.get("http://127.0.0.1:8000/requests/", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`,
      },
    })
    .then((res) => {
      setRequests(res.data);
    })
    .catch(() => {
      setError("❌ Failed to load requests.");
    })
    .finally(() => setLoading(false));
  }, []);

  const filteredRequests = requests.filter((req) =>
    req.title.toLowerCase().includes(search.toLowerCase()) &&
    (!filterCategory || req.category.toLowerCase() === filterCategory.toLowerCase()) &&
    (!filterStatus || req.status === filterStatus)
  );

  return (
    <Container fluid className="mt-4">
      <h2 className="mb-3">📌 Animation Requests Dashboard</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="d-flex gap-3 mb-3">
        <InputGroup style={{ maxWidth: "250px" }}>
          <InputGroup.Text><FaSearch /></InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search requests..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
        <Form.Select style={{ maxWidth: "200px" }} value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Physics">Physics</option>
          <option value="Biology">Biology</option>
          <option value="Mathematics">Mathematics</option>
        </Form.Select>
        <Form.Select style={{ maxWidth: "200px" }} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </Form.Select>
        <Button variant="primary" onClick={() => navigate("/app/visions/request/")}>Request Vision</Button>
      </div>

      {loading ? <Spinner animation="border" /> : (
        <Table striped bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Difficulty</th>
              <th>Deadline</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.length === 0 ? (
              <tr><td colSpan="6" className="text-center">No matching requests found.</td></tr>
            ) : (
              filteredRequests.map((req, index) => (
                <tr key={req.id} onClick={() => navigate(`/app/visions/requests/${req.id}`)} style={{ cursor: "pointer" }}>
                  <td>{index + 1}</td>
                  <td>{req.title}</td>
                  <td><Badge bg="primary">{req.category}</Badge></td>
                  <td>
                    <Badge bg={req.status === "completed" ? "success" : req.status === "in_progress" ? "warning" : "secondary"}>
                      {req.status.replace("_", " ")}
                    </Badge>
                  </td>
                  <td>{req.difficulty}</td>
                  <td>{req.deadline || "N/A"}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
}