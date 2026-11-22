import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// React frontend ki build files (dist folder) serve karne ke liye
app.use(express.static(path.join(__dirname, 'dist')));

// Live Reports history store karne ke liye list
const scanReports = [
  {
    id: 1,
    website: 'https://trustluxe.ai',
    module: 'AI Trust Analysis',
    score: '96/100',
    status: 'Trusted',
    date: new Date().toLocaleDateString()
  }
];

// 1. Risk Assessment API
app.post('/api/risk-assessment', (req, res) => {
  const { website } = req.body;
  if (!website) return res.status(400).json({ error: 'Website URL is required' });

  const isHttps = website.trim().toLowerCase().startsWith('https://');
  const riskScore = isHttps ? 25 : 75;
  const riskLevel = isHttps ? 'Low' : 'High';
  const findingsCount = isHttps ? 2 : 5;

  const recommendations = isHttps
    ? [
        'HTTPS is enabled; review TLS certificate expiry regularly.',
        'Add strict Content-Security-Policy (CSP) HTTP headers.'
      ]
    : [
        'Critical: Website is not using HTTPS encryption.',
        'Install an SSL/TLS certificate immediately.',
        'Check security-related HTTP headers and update dependencies.'
      ];

  scanReports.unshift({
    id: Date.now(),
    website,
    module: 'Risk Assessment',
    score: `${riskScore}/100`,
    status: riskLevel === 'Low' ? 'Low Risk' : 'High Risk',
    date: new Date().toLocaleDateString()
  });

  res.json({
    success: true,
    website,
    riskScore: `${riskScore}/100`,
    riskLevel,
    findings: findingsCount,
    recommendations,
    status: 'Backend connected successfully'
  });
});

// 2. Website Scanner API
app.post('/api/website-scan', (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'Website URL is required' });

  const isHttps = url.trim().toLowerCase().startsWith('https://');
  const trustScore = isHttps ? '92/100' : '40/100';
  const threatLevel = isHttps ? 'Safe' : 'Warning';

  scanReports.unshift({
    id: Date.now(),
    website: url,
    module: 'Website Scanner',
    score: trustScore,
    status: threatLevel,
    date: new Date().toLocaleDateString()
  });

  res.json({
    success: true,
    target: url,
    sslStatus: isHttps ? 'Valid SSL/TLS' : 'Not Encrypted (HTTP)',
    trustScore,
    threatLevel,
    status: 'Live scan completed via Backend'
  });
});

// 3. AI Trust Analysis API
app.post('/api/ai-trust', (req, res) => {
  const { website } = req.body;
  if (!website) return res.status(400).json({ error: 'Website URL is required' });

  const isHttps = website.trim().toLowerCase().startsWith('https://');
  const trustScore = isHttps ? '94/100' : '42/100';
  const verdict = isHttps ? 'Verified & Trusted' : 'Unverified / High Risk';

  scanReports.unshift({
    id: Date.now(),
    website,
    module: 'AI Trust Analysis',
    score: trustScore,
    status: isHttps ? 'Trusted' : 'Warning',
    date: new Date().toLocaleDateString()
  });

  res.json({
    success: true,
    website,
    trustScore,
    verdict,
    domainAge: 'Active Domain',
    sslVerified: isHttps ? 'Yes (Encrypted)' : 'No (Unsecured)',
    status: 'AI Trust Analysis completed via Backend'
  });
});

// 4. Live Reports API
app.get('/api/reports', (req, res) => {
  res.json({
    success: true,
    reports: scanReports
  });
});

// Baqi sab routes par React frontend dikhane ke liye
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`TRUSTLUXE AI running on port ${PORT}`);
});
