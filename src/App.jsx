import { useState, useEffect } from 'react';
import './App.css';
import Settings from './Settings';
import WebsiteScanner from './WebsiteScanner';
import RiskAssessment from './RiskAssessment';

const openInNewWindow = (pageName) => {
  const url = `${window.location.origin}/?page=${encodeURIComponent(pageName)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
};

function WorkspaceView() {
  const workspaces = [
    { name: 'AI Trust Analysis', desc: 'Verify domain authenticity, SSL encryption & AI trust score.', status: 'Active', icon: '✧' },
    { name: 'Website Scanner', desc: 'Deep-inspect URLs for security headers & live threat level.', status: 'Active', icon: '⌕' },
    { name: 'Risk Assessment', desc: 'Calculate risk scores & generate security recommendations.', status: 'Ready', icon: '⚑' },
    { name: 'Reports', desc: 'View centralized audit history of all executed scans.', status: 'Live', icon: '▤' },
  ];

  return (
    <div className="settings-page">
      <div className="settings-header">
        <p className="eyebrow">ENVIRONMENT HUB</p>
        <h1>TrustLuxe Workspace</h1>
        <p>Click any module below to launch it in a dedicated window.</p>
      </div>

      <div className="stats" style={{ marginBottom: '24px' }}>
        <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => openInNewWindow('Settings')}>
          <p>Active Workspace</p><h2>Enterprise Pro</h2><small>Click to configure ↗</small>
        </div>
        <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => openInNewWindow('AI Trust Analysis')}>
          <p>AI Engine</p><h2 style={{ color: '#2ecc71' }}>Online</h2><small>99.9% uptime ↗</small>
        </div>
        <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => openInNewWindow('Reports')}>
          <p>Connected Modules</p><h2>4 / 4</h2><small>View audit logs ↗</small>
        </div>
      </div>

      <div className="dashboard-grid">
        {workspaces.map((ws) => (
          <div
            className="panel scanner-panel"
            key={ws.name}
            style={{ cursor: 'pointer' }}
            onClick={() => openInNewWindow(ws.name)}
          >
            <div className="panel-heading">
              <div>
                <p className="eyebrow">WORKSPACE MODULE</p>
                <h3>{ws.icon} {ws.name}</h3>
              </div>
              <span className="gold-tag">{ws.status}</span>
            </div>
            <p className="panel-description">{ws.desc}</p>
            <button onClick={(e) => { e.stopPropagation(); openInNewWindow(ws.name); }}>
              Open {ws.name} ↗
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AITrustModule() {
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
      if (response.ok) setResult(data);
    } catch (error) {
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
          onChange={(e) => { setWebsite(e.target.value); setResult(null); }}
        />
        <button onClick={analyzeWebsite} disabled={loading}>
          {loading ? 'Analyzing with AI...' : 'Analyze Website →'}
        </button>
        {result && (
          <div style={{ marginTop: '25px' }}>
            <h3>AI Intelligence Report</h3>
            <p>Target: {result.website}</p>
            <div className="stats" style={{ marginTop: '15px' }}>
              <div className="stat-card"><p>AI Trust Score</p><h2>{result.trustScore}</h2></div>
              <div className="stat-card"><p>Verdict</p><h2 style={{ color: '#2ecc71' }}>{result.verdict}</h2></div>
              <div className="stat-card"><p>SSL Encryption</p><h2>{result.sslVerified}</h2></div>
            </div>
            <p style={{ marginTop: '20px', color: '#2ecc71' }}>✓ {result.status}</p>
          </div>
        )}
      </div>
    </div>
  );
}
function App() {
  const initialPage = new URLSearchParams(window.location.search).get('page') || 'Dashboard';
  const [active, setActive] = useState(initialPage);
  const [website, setWebsite] = useState('');
  const [dashResult, setDashResult] = useState(null);
  const [dashLoading, setDashLoading] = useState(false);
  const [reports, setReports] = useState([]);

  const menu = [
    { name: 'Workspace', icon: '❖' },
    { name: 'Dashboard', icon: '◈' },
    { name: 'AI Trust Analysis', icon: '✧' },
    { name: 'Website Scanner', icon: '⌕' },
    { name: 'Risk Assessment', icon: '⚑' },
    { name: 'Reports', icon: '▤' },
    { name: 'Settings', icon: '⚙' },
  ];

  const loadReports = () => {
    fetch('/api/reports')
      .then((res) => res.json())
      .then((data) => { if (data.success) setReports(data.reports); })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (active === 'Reports') {
      loadReports();
    }
  }, [active]);

  const handleDashboardAnalyze = async () => {
    if (!website.trim()) { alert('Please enter a website URL.'); return; }
    setDashLoading(true);
    setDashResult(null);
    try {
      const response = await fetch('/api/ai-trust', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ website }),
      });
      const data = await response.json();
      if (response.ok) setDashResult(data);
    } catch (error) {
      alert('Backend server se connect nahi ho saka.');
    } finally {
      setDashLoading(false);
    }
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand" style={{ cursor: 'pointer' }} onClick={() => openInNewWindow('Dashboard')}>
          <div className="brand-icon">T</div>
          <div><h2>TrustLuxe<span> AI</span></h2><small>INTELLIGENCE PLATFORM</small></div>
        </div>
        <p className="nav-label" style={{ cursor: 'pointer' }} onClick={() => openInNewWindow('Workspace')}>WORKSPACE ↗</p>
        <nav>
          {menu.map((item) => (
            <button key={item.name} className={`nav-item ${active === item.name ? 'active' : ''}`} onClick={() => openInNewWindow(item.name)}>
              <span>{item.icon}</span>{item.name}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="security-status" style={{ cursor: 'pointer' }} onClick={() => openInNewWindow('Risk Assessment')}>
            <span className="status-dot"></span>SYSTEM PROTECTED<p>AI engine ready ↗</p>
          </div>
          <div className="profile" style={{ cursor: 'pointer' }} onClick={() => openInNewWindow('Settings')}>
            <div className="avatar">H</div>
            <div><strong>Administrator</strong><small>Premium Account ↗</small></div>
          </div>
        </div>
      </aside>
      <main className="main">
        {active === 'Workspace' ? <WorkspaceView /> :
         active === 'Settings' ? <Settings /> :
         active === 'AI Trust Analysis' ? <AITrustModule /> :
         active === 'Website Scanner' ? <WebsiteScanner /> :
         active === 'Risk Assessment' ? <RiskAssessment /> :
         active === 'Reports' ? (
          <section className="content">
            <div className="welcome">
              <div><p className="eyebrow">AUDIT LOGS</p><h1>Security & Trust Reports</h1><p className="subtitle">Live history of all scans performed via backend.</p></div>
              <button className="date" style={{ cursor: 'pointer', background: 'transparent' }} onClick={loadReports}>
                ▤ LIVE REPORTS ↻
              </button>
            </div>
            <div className="panel activity">
              <div className="panel-heading"><div><p className="eyebrow">DATABASE RECORDS</p><h3>Recent Scan Reports ({reports.length})</h3></div></div>
              {reports.length === 0 ? (
                <p style={{ color: '#999', marginTop: '10px' }}>No scans recorded yet. Run a scan from Dashboard or Website Scanner.</p>
              ) : (
                reports.map((rep) => (
                  <div className="activity-row" key={rep.id} style={{ cursor: 'pointer' }} onClick={() => openInNewWindow('Website Scanner')}>
                    <span className="activity-icon">▤</span>
                    <div><strong>{rep.website}</strong><small>{rep.module} • Score: {rep.score} • {rep.date}</small></div>
                    <span className="activity-status">{rep.status} ↗</span>
                  </div>
                ))
              )}
            </div>
          </section>
        ) : (
          <>
            <header className="topbar">
              <div>
                <span className="breadcrumb" style={{ cursor: 'pointer' }} onClick={() => openInNewWindow('Workspace')}>Workspace / </span>
                <strong style={{ cursor: 'pointer' }} onClick={() => openInNewWindow('Dashboard')}>{active}</strong>
              </div>
              <div className="top-actions">
                <span className="online" style={{ cursor: 'pointer' }} onClick={() => openInNewWindow('AI Trust Analysis')}><i></i> AI Online ↗</span>
                <button className="notification" onClick={() => openInNewWindow('Reports')} title="Open Reports in New Window">♧</button>
                <div className="avatar" style={{ cursor: 'pointer' }} onClick={() => openInNewWindow('Settings')} title="Open Settings in New Window">H</div>
              </div>
            </header>
            <section className="content">
              <div className="welcome">
                <div><p className="eyebrow">TRUSTLUXE INTELLIGENCE</p><h1>Welcome to TrustLuxe AI</h1><p className="subtitle">Your intelligent platform for digital trust and security.</p></div>
                <button className="date" style={{ cursor: 'pointer', background: 'transparent' }} onClick={() => openInNewWindow('Workspace')}>
                  ✧ INTELLIGENCE OVERVIEW ↗
                </button>
              </div>
              <div className="stats">
                <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => openInNewWindow('Reports')}><span className="stat-icon">◈</span><p>Total Analyses</p><h2>1,284</h2><small>↑ 12.8% this month ↗</small></div>
                <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => openInNewWindow('AI Trust Analysis')}><span className="stat-icon">✧</span><p>Trusted Websites</p><h2>946</h2><small>↑ 8.4% this month ↗</small></div>
                <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => openInNewWindow('Risk Assessment')}><span className="stat-icon">⚑</span><p>Threats Detected</p><h2>38</h2><small className="warning">Requires attention ↗</small></div>
                <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => openInNewWindow('Website Scanner')}><span className="stat-icon">◎</span><p>Trust Score</p><h2>94.8<span className="percent">%</span></h2><small>Platform overview ↗</small></div>
              </div>
              <div className="dashboard-grid">
                <div className="panel scanner-panel">
                  <div className="panel-heading"><div><p className="eyebrow">AI POWERED TOOL</p><h3>Website Trust Scanner</h3></div><span className="gold-tag" style={{ cursor: 'pointer' }} onClick={() => openInNewWindow('Website Scanner')}>BETA ↗</span></div>
                  <p className="panel-description">Analyze a website to evaluate its digital trust and security indicators.</p>
                  <label>WEBSITE URL</label>
                  <div className="scan-input">
                    <input type="url" placeholder="https://example.com" value={website} onChange={(e) => { setWebsite(e.target.value); setDashResult(null); }} />
                    <button onClick={handleDashboardAnalyze} disabled={dashLoading}>{dashLoading ? 'Analyzing...' : 'Analyze →'}</button>
                  </div>
                  {dashResult ? (
                    <div className="scan-note" style={{ color: '#2ecc71', marginTop: '12px' }}>✓ Score: <strong>{dashResult.trustScore}</strong> — {dashResult.verdict}</div>
                  ) : (
                    <div className="scan-note">✧ Enter a website URL to get started</div>
                  )}
                </div>
                <div className="panel score-panel" style={{ cursor: 'pointer' }} onClick={() => openInNewWindow('AI Trust Analysis')}>
                  <p className="eyebrow">PLATFORM OVERVIEW</p><h3>Trust Intelligence</h3>
                  <div className="score-circle"><div><strong>94.8</strong><small>TRUST SCORE</small></div></div>
                  <p className="score-caption">Excellent platform score ↗</p>
                </div>
              </div>
              <div className="panel activity">
                <div className="panel-heading"><div><p className="eyebrow">MONITORING CENTER</p><h3>Recent Activity</h3></div><button className="view-button" onClick={() => openInNewWindow('Reports')}>View All ↗</button></div>
                <div className="activity-row" style={{ cursor: 'pointer' }} onClick={() => openInNewWindow('Website Scanner')}><span className="activity-icon">◈</span><div><strong>Website analysis</strong><small>Trust evaluation module</small></div><span className="activity-status">Ready ↗</span></div>
                <div className="activity-row" style={{ cursor: 'pointer' }} onClick={() => openInNewWindow('AI Trust Analysis')}><span className="activity-icon">✧</span><div><strong>AI engine initialized</strong><small>System initialization</small></div><span className="activity-status">Active ↗</span></div>
                <div className="activity-row" style={{ cursor: 'pointer' }} onClick={() => openInNewWindow('Risk Assessment')}><span className="activity-icon">⚑</span><div><strong>Security monitoring</strong><small>Monitoring dashboard</small></div><span className="activity-status">Online ↗</span></div>
              </div>
              <footer>© 2026 TRUSTLUXE AI. ALL RIGHTS RESERVED.</footer>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
