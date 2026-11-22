import { useState } from 'react';

function AITrustAnalysis() {
  const [website, setWebsite] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const analyzeWebsite = async () => {
    if (!website.trim()) {
      alert('Please enter a website URL');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/ai-trust', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ website }),
      });

      const data = await response.json();
      if (response.ok) {
        setResult(data);
      } else {
        alert(data.error || 'Analysis failed');
      }
    } catch (error) {
      console.error('AI Trust error:', error);
      alert('Backend server se connect nahi ho saka.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <p className="eyebrow">INTELLIGENCE MODULE</p>
        <h1>AI Trust Analysis</h1>
        <p>Evaluate website trust indicators and security information.</p>
      </div>

      <div className="settings-card">
        <h3>Website Analysis</h3>
        <p>Enter a website URL to begin your analysis.</p>

        <input
          type="url"
          placeholder="https://example.com"
          value={website}
          onChange={(e) => {
            setWebsite(e.target.value);
            setResult(null);
          }}
        />

        <button onClick={analyzeWebsite} disabled={loading}>
          {loading ? 'Analyzing with AI...' : 'Analyze Website →'}
        </button>

        {result && (
          <div style={{ marginTop: '25px' }}>
            <h3>AI Intelligence Report</h3>
            <p>Target: {result.website}</p>

            <div className="stats" style={{ marginTop: '15px' }}>
              <div className="stat-card">
                <p>AI Trust Score</p>
                <h2>{result.trustScore}</h2>
              </div>

              <div className="stat-card">
                <p>Verdict</p>
                <h2 style={{ color: result.sslVerified.startsWith('Yes') ? '#2ecc71' : '#e74c3c' }}>
                  {result.verdict}
                </h2>
              </div>

              <div className="stat-card">
                <p>SSL Encryption</p>
                <h2>{result.sslVerified}</h2>
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

export default AITrustAnalysis;
