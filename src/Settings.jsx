
function Settings() {
  return (
    <div className="settings-page">
      <p className="eyebrow">CONFIGURATION CENTER</p>
      <h1>Platform Settings</h1>
      <p className="subtitle">
        Manage your TrustLuxe AI platform preferences.
      </p>

      <div className="settings-card">
        <h3>Profile Settings</h3>
        <p>Manage your administrator profile.</p>
        <label>Full Name</label>
        <input type="text" defaultValue="Administrator" />
        <label>Email Address</label>
        <input type="email" placeholder="Enter your email" />
        <button onClick={() => alert('Profile settings demo saved!')}>
          Save Profile
        </button>
      </div>

      <div className="settings-card">
        <h3>Security Preferences</h3>
        <p>Configure your platform security preferences.</p>

        <label className="setting-option">
          <span>Two-Factor Authentication</span>
          <input type="checkbox" />
        </label>

        <label className="setting-option">
          <span>Email Notifications</span>
          <input type="checkbox" defaultChecked />
        </label>

        <label className="setting-option">
          <span>Security Alerts</span>
          <input type="checkbox" defaultChecked />
        </label>
      </div>

      <div className="settings-card">
        <h3>API Configuration</h3>
        <p>API integration will be configured during backend development.</p>
        <span className="gold-tag">COMING SOON</span>
      </div>
    </div>
  );
}

export default Settings;
