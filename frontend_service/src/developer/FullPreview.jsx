import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FiSmartphone, FiMonitor, FiX } from 'react-icons/fi';

const FullPreview = () => {
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');
  const [viewMode, setViewMode] = useState('desktop');
  const [srcDoc, setSrcDoc] = useState('');

  useEffect(() => {
    // Load code from localStorage
    const loadCode = () => {
      setHtml(localStorage.getItem('html') || '');
      setCss(localStorage.getItem('css') || '');
      setJs(localStorage.getItem('js') || '');
    };

    loadCode();

    // Update code when localStorage changes
    const handleStorageChange = (e) => {
      if (e.key === 'html') setHtml(e.newValue || '');
      if (e.key === 'css') setCss(e.newValue || '');
      if (e.key === 'js') setJs(e.newValue || '');
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <head><style>${css}</style></head>
          <body>${html}</body>
          <script>${js}</script>
        </html>
      `);
    }, 500);
    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'black',
      zIndex: 9999
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        backgroundColor: '#1e1e1e',
        borderBottom: '1px solid #333'
      }}>
        <span style={{ color: 'white', fontSize: '1.2rem' }}>
          Full Screen Preview
        </span>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button 
            variant={viewMode === 'mobile' ? 'primary' : 'outline-secondary'} 
            size="sm"
            onClick={() => setViewMode('mobile')}
          >
            <FiSmartphone />
          </Button>
          <Button 
            variant={viewMode === 'desktop' ? 'primary' : 'outline-secondary'} 
            size="sm"
            onClick={() => setViewMode('desktop')}
          >
            <FiMonitor />
          </Button>
          <Button 
            variant="outline-danger" 
            size="sm"
            onClick={() => window.close()}
          >
            <FiX />
          </Button>
        </div>
      </div>

      <div style={{
        position: 'fixed',
        top: '50px',
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden'
      }}>
        <iframe
          srcDoc={srcDoc}
          title="full-preview"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            backgroundColor: 'white'
          }}
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  );
};

export default FullPreview;