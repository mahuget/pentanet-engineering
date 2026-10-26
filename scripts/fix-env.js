// Fix Vercel environment variable types
// Run: node scripts/fix-env.js
const https = require('https');
const TOKEN = process.env.VERCEL_TOKEN;
const PROJECT_ID = 'prj_XKJYAuIhFsu2YhuQNNs5Tt2Kvlxs';

const fixes = [
  // DATABASE_URL — must be 'encrypted' not 'sensitive' to be available at runtime
  { id: 'z9Ifz9ALJm9Z2yjS', key: 'DATABASE_URL', value: 'postgresql://postgres.kjjrohqfuqffljliflye:penta%40%40net12345@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true', type: 'encrypted' },
  // DIRECT_URL
  { id: 'ZubEnCVWvku6kzB1', key: 'DIRECT_URL', value: 'postgresql://postgres.kjjrohqfuqffljliflye:penta%40%40net12345@aws-0-ap-south-1.pooler.supabase.com:5432/postgres', type: 'encrypted' },
  // NEXT_PUBLIC_ vars must be 'plain' to be available in browser
  { id: 'zgu9YpMspEI3Gvy4', key: 'NEXT_PUBLIC_SITE_URL', value: 'https://pentanetengineering.com', type: 'plain' },
  { id: 'PLlNcgiVIiRY3qkA', key: 'NEXT_PUBLIC_SANITY_PROJECT_ID', value: 'unconfigured', type: 'plain' },
];

function patch(fix) {
  return new Promise(resolve => {
    const body = JSON.stringify({
      key: fix.key,
      value: fix.value,
      type: fix.type,
      target: ['production', 'preview', 'development']
    });
    const opts = {
      hostname: 'api.vercel.com',
      path: `/v10/projects/${PROJECT_ID}/env/${fix.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': 'Bearer ' + TOKEN,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    };
    const req = https.request(opts, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        const j = JSON.parse(d);
        if (j.key) console.log('Fixed:', j.key, '→', j.type);
        else console.log('Error on', fix.key, ':', JSON.stringify(j).substring(0, 150));
        resolve();
      });
    });
    req.on('error', e => { console.log('err:', e.message); resolve(); });
    req.write(body);
    req.end();
  });
}

(async () => {
  console.log('Fixing Vercel env var types...');
  for (const fix of fixes) await patch(fix);
  console.log('Done!');
})();
