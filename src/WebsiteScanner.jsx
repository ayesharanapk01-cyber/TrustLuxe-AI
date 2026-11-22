import { useState } from 'react';

function WebsiteScanner() {
  const [url, setUrl] = useState('');
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);

  const handleScan = async () => {
    const cleanInput = url.trim();
    if (!cleanInput) {
      alert('Please enter a website URL');
      return;
    }

    let formattedUrl;
    try {
      const parsedUrl = new URL(
        cleanInput.startsWith('http') ? cleanInput : `https://${cleanInput}`
      );

      if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        alert('Please enter a valid website URL');
        return;
      }

      formattedUrl = parsedUrl.href;
      setUrl(formattedUrl);
    } catch {
      alert('Please enter a valid website URL');
      return;
    }

    setScanning(true);
    setResult(null);

    try {
      const response = await fetch('/api/website-scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: formattedUrl }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        alert(data.error || 'Scan failed');
      }
    } catch (error) {
      console.error('Scan error:', error);
      alert('Backend server se connect nahi ho saka.');
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="content">
      <div className="welcome">
        <div>
          <p className="eyebrow">SECURITY INTELLIGENCE</p>
          <h1>Website Scanner</h1>
          <p className="subtitle">
            Inspect website security and digital trust indicators.
          </p>
        </div>
      </div>

      <div className="panel scanner-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">WEB SECURITY TOOL</p>
            <h3>Website Security Scan</h3>
          </div>
          <span className="gold-tag">BETA</span>
        </div>

        <p className="panel-description">
          Enter a website URL to prepare a security assessment.
        </p>

        <label>WEBSITE URL</label>

        <div className="scan-input">
          <input
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setResult(null);
            }}
          />

          <button onClick={handleScan} disabled={scanning}>
            {scanning ? 'Scanning...' : 'Start Scan →'}
          </button>
        </div>

        {scanning && <p style={{ marginTop: '15px' }}>Scanning target via backend...</p>}

        {result && (
          <div style={{ marginTop: '25px' }}>
            <h3>Live Scan Results</h3>
            <p>Target: {result.target}</p>

            <div className="stats" style={{ marginTop: '15px' }}>
              <div className="stat-card">
                <p>Trust Score</p>
                <h2>{result.trustScore}</h2>
              </div>

              <div className="stat-card">
                <p>SSL / TLS Status</p>
                <h2>{result.sslStatus}</h2>
              </div>

              <div className="stat-card">
                <p>Threat Status</p>
                <h2 style={{ color: result.threatLevel === 'Safe' ? '#2ecc71' : '#e74c3c' }}>
                  {result.threatLevel}
                </h2>
              </div>
            </div>

            <p style={{ marginTop: '20px', color: '#2ecc71' }}>
              ✓ {result.status}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WebsiteScanner;
