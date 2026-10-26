// Deploy to Vercel — run: node scripts/deploy.js
// TOKEN is passed via environment variable, not hardcoded
const https = require('https');
const TOKEN = process.env.VERCEL_TOKEN;
if (!TOKEN) { console.log('Set VERCEL_TOKEN env var'); process.exit(1); }

const body = JSON.stringify({
  name: 'pentanet-engineering-kvw7',
  gitSource: { type: 'github', repoId: '1432169625', ref: 'main' }
});
const opts = {
  hostname: 'api.vercel.com', path: '/v13/deployments', method: 'POST',
  headers: { 'Authorization': 'Bearer ' + TOKEN, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
};
const req = https.request(opts, res => {
  let d = ''; res.on('data', c => d += c);
  res.on('end', () => {
    const j = JSON.parse(d);
    if (j.url) { console.log('Deploy ID:', j.id); console.log('State:', j.readyState); }
    else console.log(JSON.stringify(j).substring(0, 200));
  });
});
req.on('error', e => console.log('Error:', e.message));
req.write(body); req.end();
