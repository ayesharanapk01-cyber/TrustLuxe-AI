import { useState } from 'react';

function RiskAssessment() {
  const [website, setWebsite] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAssessment = async () => {
    if (!website.trim()) {
      alert('Please enter a website URL');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/risk-assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ website }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        alert(data.error || 'Assessment failed');
      }
    } catch (error) {
      console.error('Backend connection error:', error);
      alert('Backend server se connect nahi ho saka. Check karein ke node server.js chal raha hai.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content">
      <div className="welcome">
        <div>
          <p className="eyebrow">SECURITY INTELLIGENCE</p>
          <h1>Risk Assessment</h1>
          <p className="subtitle">
            Evaluate potential website security risks.
          </p>
        </div>
      </div>

      <div className="panel scanner-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">RISK ANALYSIS MODULE</p>
            <h3>Website Risk Evaluation</h3>
          </div>
          <span className="gold-tag">BETA</span>
        </div>

        <p className="panel-description">
          Enter a website URL to prepare a risk assessment.
        </p>

        <label>WEBSITE URL</label>

        <div className="scan-input">
          <input
            type="text"
            placeholder="https://example.com"
            value={website}
            onChange={(e) => {
              setWebsite(e.target.value);
              setResult(null);
            }}
          />

          <button onClick={handleAssessment} disabled={loading}>
            {loading ? 'Analyzing...' : 'Assess Risk →'}
          </button>
        </div>

        {result && (
          <div style={{ marginTop: '30px' }}>
            <h3>Live Risk Assessment</h3>
            <p>Target: {result.website}</p>

            <div className="stats">
              <div className="stat-card">
                <p>Risk Score</p>
                <h2>{result.riskScore}</h2>
              </div>

              <div className="stat-card">
                <p>Risk Level</p>
                <h2 style={{ color: result.riskLevel === 'High' ? '#e74c3c' : '#2ecc71' }}>
                  {result.riskLevel}
                </h2>
              </div>

              <div className="stat-card">
                <p>Findings</p>
                <h2>{result.findings}</h2>
              </div>
            </div>

            <h3 style={{ marginTop: '25px' }}>
              Security Recommendations
            </h3>

            <ul>
                {(result.recommendations || []).map((item, index) => (
  <li key={index}>{item}</li>
))}
              
            </ul>
            
            <p style={{ marginTop: '20px', color: '#2ecc71' }}>
              ✓ {result.status}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RiskAssessment;
