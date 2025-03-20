import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Badge, Spinner, Alert, ListGroup, ProgressBar, Button } from "react-bootstrap";
import axios from "axios";
import "../../assets/developer/css/RequestDetails.css"; // Create this CSS file for custom styles
import { BsClock, BsPerson, BsTags, BsCash, BsDiagram3, BsLink45Deg, BsHandThumbsUp, BsFile, BsBook, BsShare, BsSend } from "react-icons/bs";

export default function RequestDetails() {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [animationLink, setAnimationLink] = useState("");
  const [description, setDescription] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "success";
      case "medium":
        return "warning";
      case "hard":
        return "danger";
      default:
        return "secondary";
    }
  };
  const getDifficultyValue = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return 33;
      case "medium":
        return 66;
      case "hard":
        return 100;
      default:
        return 0;
    }
  };
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

  if (loading) return (
    <div className="text-center mt-5">
      <Spinner animation="grow" variant="primary" className="mt-5" />
      <p className="mt-3 text-muted">Loading request details...</p>
    </div>
  );

  if (error) return <Alert variant="danger" className="rounded-pill shadow text-center">{error}</Alert>;
  if (!request) return <Alert variant="warning" className="rounded-pill shadow text-center">⚠️ Request not found</Alert>;


  const handleContributionSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/contributions/",
        {
          animation_request: id,
          animation_link: animationLink,
          description: description,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      );

      // Update contributions list and reset form
      setContributions([response.data, ...contributions]);
      setAnimationLink("");
      setDescription("");
      setShowForm(false);
    } catch (err) {
      setSubmitError(err.response?.data?.message || "Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="">
      <Row className="g-4">
        {/* Main Request Section */}
        <Col lg={8}>
          <Card className="glass-card border-0 p-4 px-0">
            <div className="d-flex align-items-center mb-4">
              <div className="flex-grow-1">
                <h3 className="fw-bold gradient-text">{request.title}</h3>
                <div className="d-flex gap-2 mt-2">
                  <Badge pill bg="primary" className="d-flex align-items-center">
                    <BsTags size={14} className="me-1" /> {request.category}
                  </Badge>
                  <Badge pill bg={request.status === "completed" ? "success" : "warning"} className="d-flex align-items-center">
                    {request.status === "completed" ? "🎉 Completed" : "🕒 In Progress"}
                  </Badge>
                  <Badge pill bg={request.status === "completed" ? "secondary" : "info"} className="d-flex align-items-center">
                  <BsCash size={14} className="me-1" /> Rs {request.budget}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="mb-0">
              <p className="lead text-muted" style={{ fontSize: '16px' }}>{request.description}</p>
            </div>

            <Row className="g-3 mb-3">
              <Col md={6}>
                <Card className="h-100 stats-card">
                  <Card.Body>
                    <div className="d-flex align-items-center">
                      <div className="icon-wrapper bg-primary">
                        <BsClock size={24} className="text-white" />
                      </div>
                      <div className="ms-3">
                        <h6 className="mb-0">Deadline</h6>
                        <p className="mb-0 fw-bold">{request.deadline || "Flexible"}</p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="h-100 stats-card">
                  <Card.Body>
                    <div className="d-flex align-items-center">
                      <div className="icon-wrapper bg-success">
                        <BsDiagram3 size={24} className="text-white" />
                      </div>
                      <div className="ms-3">
                        <h6 className="mb-0">Difficulty</h6>
                        <ProgressBar
                          now={getDifficultyValue(request.difficulty)}
                          label={request.difficulty}
                          className="mt-1"
                          style={{ width: "120px",height:'100%' }}
                          variant={getDifficultyColor(request.difficulty)}
                        />
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={12}>
                <Card className="h-100 stats-card">
                  <Card.Body>
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                      <div className="d-flex align-items-center">
                        <div className="icon-wrapper bg-success">
                          <BsBook size={24} className="text-white" />
                        </div>
                        <div className="ms-3">
                          <h6 className="mb-0">Supporting Documents</h6>
                          <h6>Budget : {request.budget} Rs</h6>
                        </div>
                      </div>
                      {request.attachments ? (
                          <a href={request.attachments} target="_blank" rel="noopener noreferrer" className="document_preview">
                            <Badge pill bg="success" style={{display:'flex',gap:'10px',alignItems:'center',cursor:'pointer'}}>
                              <span style={{fontSize:'16px'}}> View </span><BsSend size={16} />
                            </Badge>
                          </a>
                        ) : (
                          <span style={{color:'gray'}}>No Attachment</span>
                        )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Card className="mb-4 contributor-card">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="icon-wrapper bg-info">
                    <BsPerson size={24} className="text-white" />
                  </div>
                  <div className="ms-3" style={{ width: '100%' }}>
                    <div className="d-flex align-items-center" style={{ width: '100%' }}>
                      <div className="d-flex align-items-center">
                        <img
                          src={request.created_by?.profile_picture || "/default-avatar.png"}
                          alt="avatar"
                          className="avatar-sm rounded-circle me-2"
                        />
                        <span className="fw-bold px-2">{request.created_by?.username || "Anonymous"}</span>
                        <Badge pill bg="primary" className="d-flex align-items-center">
                          <BsTags size={14} className="me-1" />{request.created_by?.role || "Visitor"}
                        </Badge>
                      </div>
                      <h6 style={{ textAlign: 'right', width: '100%' }}>
                        <Badge pill bg="success">
                          <BsPerson size={14} className="me-1" />Created By
                        </Badge>
                      </h6>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>

            <div className="tags-section mb-4">
              <h5 className="mb-3"><BsTags className="me-2" /> Tags</h5>
              <div className="d-flex flex-wrap gap-2">
                {request.tags.map((tag, index) => (
                  <Badge key={index} pill bg="light" className="text-dark border px-3">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        </Col>

        {/* Contributions Section */}
        <Col lg={4}>
          <Card className="glass-card border-0 p-4 px-0">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="mb-0"><BsCash className="me-2" /> Contributions ({contributions.length})</h3>
              {request.created_by?.role === "Developer" && (
                <Button
                  variant={showForm ? "outline-danger" : "primary"}
                  onClick={() => setShowForm(!showForm)}
                  size="sm"
                  className="rounded-pill"
                >
                  {showForm ? "Cancel" : "+ New"}
                </Button>
              )}
            </div>

            {showForm && (
              <Card className="mb-4">
                <Card.Body>
                  <form onSubmit={handleContributionSubmit}>
                    <div className="mb-3">
                      <label htmlFor="animationLink" className="form-label small">
                        Animation URL <span className="text-danger">*</span>
                      </label>
                      <input
                        type="url"
                        className="form-control form-control-sm"
                        id="animationLink"
                        value={animationLink}
                        onChange={(e) => setAnimationLink(e.target.value)}
                        required
                        placeholder="https://example.com/animation"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label small">
                        Description <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className="form-control form-control-sm"
                        id="description"
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        placeholder="Describe your contribution..."
                      />
                    </div>
                    <div className="d-grid gap-2">
                      <Button
                        type="submit"
                        variant="success"
                        disabled={isSubmitting}
                        size="sm"
                        className="rounded-pill"
                      >
                        {isSubmitting ? (
                          <>
                            <Spinner animation="border" size="sm" className="me-2" />
                            Submitting...
                          </>
                        ) : "Submit Contribution"}
                      </Button>
                      {submitError && (
                        <Alert variant="danger" className="text-center py-1 my-0">
                          {submitError}
                        </Alert>
                      )}
                    </div>
                  </form>
                </Card.Body>
              </Card>
            )}
            {contributions.length > 0 ? (
              <div className="contribution-list">
                {contributions.map((contribution) => (
                  <Card key={contribution.id} className="mb-3 contribution-item">
                    <Card.Body>
                      <div className="d-flex align-items-start">
                        <img
                          src={contribution.developer.profile_picture || "/default-avatar.png"}
                          alt="avatar"
                          className="avatar-xs rounded-circle me-2"
                        />
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between">
                            <h6 className="mb-1">{contribution.developer.username}</h6>
                            <small className="text-muted">2d ago</small>
                          </div>
                          <p className="mb-2 small">{contribution.description}</p>
                          <div className="d-flex justify-content-between align-items-center">
                            <Button
                              variant="link"
                              href={contribution.animation_link}
                              target="_blank"
                              className="p-0 text-decoration-none"
                            >
                              <BsLink45Deg className="me-1" /> View Animation
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="mb-3 contribution-item">
                <Card.Body>
                  <div className="text-center py-4 empty-state">
                    <i class="bi bi-ban mb-3"></i>
                    <p className="text-muted">No contributions yet</p>
                  </div>
                </Card.Body>
              </Card>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}