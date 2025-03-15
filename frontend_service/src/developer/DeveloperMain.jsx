import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Nav, Button, Spinner } from 'react-bootstrap';
import { FiCode, FiLayout, FiSettings, FiCloud, FiMonitor, FiSmartphone, FiExternalLink } from 'react-icons/fi';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/developer/css/DeveloperMain.css';

const CodeEditor = () => {
  // Load code from localStorage on initial state
  const [html, setHtml] = useState(() => {
    const savedHtml = localStorage.getItem('html');
    return savedHtml || '<h1>Hello World</h1>';
  });
  const [css, setCss] = useState(() => {
    const savedCss = localStorage.getItem('css');
    return savedCss || 'body { padding: 20px; }';
  });
  const [js, setJs] = useState(() => {
    const savedJs = localStorage.getItem('js');
    return savedJs || 'console.log("Hello from Visora!");';
  });

  const [activeTab, setActiveTab] = useState('html');
  const [deploying, setDeploying] = useState(false);
  const [viewMode, setViewMode] = useState('desktop');
  const iframeRef = useRef(null);

  const navigate = useNavigate();

  // Save code to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('html', html);
  }, [html]);

  useEffect(() => {
    localStorage.setItem('css', css);
  }, [css]);

  useEffect(() => {
    localStorage.setItem('js', js);
  }, [js]);

  const srcDoc = `
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>${html}</body>
      <script>${js}</script>
    </html>
  `;

  useEffect(() => {
    const timeout = setTimeout(() => {
      iframeRef.current.srcdoc = srcDoc;
    }, 500);
    return () => clearTimeout(timeout);
  }, [html, css, js]);

  const handleDeploy = async () => {
    setDeploying(true);
    try {
      const response = await fetch('dev/vercel/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ html, css, js })
      });
      const { url } = await response.json();
      window.open(url, '_blank');
    } catch (error) {
      alert('Deployment failed: ' + error.message);
    }
    setDeploying(false);
  };

  const handleFullPreview = () => {
    const newWindow = window.open('/app/dev/preview', '_blank');
    if (newWindow) newWindow.focus();
  };


  return (
    <Container fluid className="dev-editor vh-100 d-flex flex-column py-3 px-0">
      <div className="border p-2 d-flex align-items-center justify-content-between" style={{borderRadius:'10px'}}>
        <div className="d-flex align-items-center gap-3">
          <span className="text-light fs-5 fw-bold d-flex align-items-center gap-2">
            <FiCode className="text-secondary" /> Visora Studio
          </span>
        </div>
        <div className="d-flex gap-2">
          <Button 
            variant="outline-primary" 
            size="sm"
            onClick={handleDeploy}
            disabled={deploying}
            className="d-flex align-items-center gap-2"
          >
            {deploying ? (
              <>
                <Spinner animation="border" size="sm" />
                Deploying...
              </>
            ) : (
              <>
                <FiCloud /> Deploy to Vercel
              </>
            )}
          </Button>
        </div>
      </div>

      <Row className="flex-grow-1 m-0 py-3" style={{borderRadius:'10px'}}>
        <Col md={8} className="p-0 border" style={{borderRadius:'10px'}}>
          <div className="d-flex flex-column h-100">
            <Nav variant="pills" className="">
              <Nav.Item>
                <Nav.Link 
                  active={activeTab === 'html'} 
                  onClick={() => setActiveTab('html')}
                  className="d-flex align-items-center gap-2 text-light"
                >
                  <FiLayout /> HTML
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link 
                  active={activeTab === 'css'} 
                  onClick={() => setActiveTab('css')}
                  className="d-flex align-items-center gap-2 text-light"
                >
                  <FiSettings /> CSS
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link 
                  active={activeTab === 'js'} 
                  onClick={() => setActiveTab('js')}
                  className="d-flex align-items-center gap-2 text-light"
                >
                  <FiCode /> JavaScript
                </Nav.Link>
              </Nav.Item>
            </Nav>

            <div className="flex-grow-1 position-relative">
              {activeTab === 'html' && (
                <Editor
                  height="100%"
                  language="html"
                  value={html}
                  onChange={setHtml}
                  options={{ 
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    lineNumbersMinChars: 1,
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                  }}
                  theme="vs-dark"
                />
              )}
              {activeTab === 'css' && (
                <Editor
                  height="100%"
                  language="css"
                  value={css}
                  onChange={setCss}
                  options={{ 
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    lineNumbersMinChars: 1,
                  }}
                  theme="vs-dark"
                />
              )}
              {activeTab === 'js' && (
                <Editor
                  height="100%"
                  language="javascript"
                  value={js}
                  onChange={setJs}
                  options={{ 
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbersMinChars: 1,
                    lineNumbers: 'on',
                  }}
                  theme="vs-dark"
                />
              )}
            </div>
          </div>
        </Col>

        <Col md={4} className="p-0 bg-dark" style={{borderRadius:'10px'}}>
          <div className="h-100 position-relative">
            <div className="preview-header px-3 py-3 d-flex align-items-center justify-content-between border">
              <span className="text-light fs-5 fw-medium">
                Live Preview
              </span>
              <div className="d-flex gap-2">
                <Button 
                variant="outline-secondary" 
                size="sm"
                onClick={handleFullPreview}
                className="d-flex align-items-center gap-1"
                >
                <FiExternalLink /> Full
                </Button>
                <Button 
                  variant={viewMode === 'mobile' ? 'primary' : 'outline-secondary'} 
                  size="sm"
                  onClick={() => setViewMode('mobile')}
                  className="d-flex align-items-center gap-1"
                >
                  <FiSmartphone />
                </Button>
                <Button 
                  variant={viewMode === 'desktop' ? 'primary' : 'outline-secondary'} 
                  size="sm"
                  onClick={() => setViewMode('desktop')}
                  className="d-flex align-items-center gap-1"
                >
                  <FiMonitor />
                </Button>
              </div>
            </div>
            <div className={`preview-container ${viewMode}-view`} >
              <iframe
                ref={iframeRef}
                title="preview"
                className="w-100 h-100 bg-dark"
                sandbox="allow-scripts allow-same-origin"
                style={{borderBottomRightRadius:'10px',borderBottomLeftRadius:'10px'}}
              />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CodeEditor;