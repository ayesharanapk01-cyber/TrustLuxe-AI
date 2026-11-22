function App() {
  const [active, setActive] = useState('Dashboard');
  const [website, setWebsite] = useState('');
  const [dashResult, setDashResult] = useState(null);
  const [dashLoading, setDashLoading] = useState(false);
  const [reports, setReports] = useState([]);

  const menu = [
    { name: 'Dashboard', icon: '◈' },
    { name: 'AI Trust Analysis', icon: '✧' },
    { name: 'Website Scanner', icon: '⌕' },
    { name: 'Risk Assessment', icon: '⚑' },
    { name: 'Reports', icon: '▤' },
    { name: 'Settings', icon: '⚙' },
  ];

  useEffect(() => {
    if (active === 'Reports') {
      fetch('/api/reports')
        .then((res) => res.json())
        .then((data) => { if (data.success) setReports(data.reports); })
        .catch((err) => console.error(err));
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
        <div className="brand" style={{ cursor: 'pointer' }} onClick={() => setActive('Dashboard')}>
          <div className="brand-icon">T</div>
          <div><h2>TrustLuxe<span> AI</span></h2><small>INTELLIGENCE PLATFORM</small></div>
        </div>
        <p className="nav-label">WORKSPACE</p>
        <nav>
          {menu.map((item) => (
            <button key={item.name} className={`nav-item ${active === item.name ? 'active' : ''}`} onClick={() => setActive(item.name)}>
              <span>{item.icon}</span>{item.name}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="security-status"><span className="status-dot"></span>SYSTEM PROTECTED<p>AI engine ready</p></div>
          <div className="profile" style={{ cursor: 'pointer' }} onClick={() => setActive('Settings')} title="Account Settings">
            <div className="avatar">H</div>
            <div><strong>Administrator</strong><small>Premium Account</small></div>
          </div>
        </div>
      </aside>
      <main className="main">
        {active === 'Settings' ? <Settings /> :
         active === 'AI Trust Analysis' ? <AITrustModule /> :
         active === 'Website Scanner' ? <WebsiteScanner /> :
         active === 'Risk Assessment' ? <RiskAssessment /> :
         active === 'Reports' ? (
          <section className="content">
            <div className="welcome">
              <div><p className="eyebrow">AUDIT LOGS</p><h1>Security & Trust Reports</h1><p className="subtitle">Live history of all scans performed via backend.</p></div>
              <div className="date">▤ LIVE REPORTS</div>
            </div>
            <div className="panel activity">
              <div className="panel-heading"><div><p className="eyebrow">DATABASE RECORDS</p><h3>Recent Scan Reports ({reports.length})</h3></div></div>
              {reports.map((rep) => (
                <div className="activity-row" key={rep.id}>
                  <span className="activity-icon">▤</span>
                  <div><strong>{rep.website}</strong><small>{rep.module} • Score: {rep.score} • {rep.date}</small></div>
                  <span className="activity-status">{rep.status}</span>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <>
            <header className="topbar">
              <div><span className="breadcrumb">Workspace / </span><strong>{active}</strong></div>
              <div className="top-actions">
                <span className="online"><i></i> AI Online</span>
                <button className="notification" onClick={() => setActive('Reports')} title="View Reports">♧</button>
                <div className="avatar" style={{ cursor: 'pointer' }} onClick={() => setActive('Settings')} title="Account Settings">H</div>
              </div>
            </header>
            <section className="content">
              <div className="welcome">
                <div><p className="eyebrow">TRUSTLUXE INTELLIGENCE</p><h1>Welcome to TrustLuxe AI</h1><p className="subtitle">Your intelligent platform for digital trust and security.</p></div>
                <div className="date">✧ INTELLIGENCE OVERVIEW</div>
              </div>
              <div className="stats">
                <div className="stat-card"><span className="stat-icon">◈</span><p>Total Analyses</p><h2>1,284</h2><small>↑ 12.8% this month</small></div>
                <div className="stat-card"><span className="stat-icon">✧</span><p>Trusted Websites</p><h2>946</h2><small>↑ 8.4% this month</small></div>
                <div className="stat-card"><span className="stat-icon">⚑</span><p>Threats Detected</p><h2>38</h2><small className="warning">Requires attention</small></div>
                <div className="stat-card"><span className="stat-icon">◎</span><p>Trust Score</p><h2>94.8<span className="percent">%</span></h2><small>Platform overview</small></div>
              </div>
              <div className="dashboard-grid">
                <div className="panel scanner-panel">
                  <div className="panel-heading"><div><p className="eyebrow">AI POWERED TOOL</p><h3>Website Trust Scanner</h3></div><span className="gold-tag">BETA</span></div>
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
                <div className="panel score-panel">
                  <p className="eyebrow">PLATFORM OVERVIEW</p><h3>Trust Intelligence</h3>
                  <div className="score-circle"><div><strong>94.8</strong><small>TRUST SCORE</small></div></div>
                  <p className="score-caption">Excellent platform score</p>
                </div>
              </div>
              <div className="panel activity">
                <div className="panel-heading"><div><p className="eyebrow">MONITORING CENTER</p><h3>Recent Activity</h3></div><button className="view-button" onClick={() => setActive('Reports')}>View All →</button></div>
                <div className="activity-row"><span className="activity-icon">◈</span><div><strong>Website analysis</strong><small>Trust evaluation module</small></div><span className="activity-status">Ready</span></div>
                <div className="activity-row"><span className="activity-icon">✧</span><div><strong>AI engine initialized</strong><small>System initialization</small></div><span className="activity-status">Active</span></div>
                <div className="activity-row"><span className="activity-icon">⚑</span><div><strong>Security monitoring</strong><small>Monitoring dashboard</small></div><span className="activity-status">Online</span></div>
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
