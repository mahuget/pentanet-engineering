// Delete sensitive DB vars and recreate as encrypted
const https = require('https');
const TOKEN = process.env.VERCEL_TOKEN;
const PROJECT_ID = 'prj_XKJYAuIhFsu2YhuQNNs5Tt2Kvlxs';

function del(id, key) {
  return new Promise(resolve => {
    const opts = {
      hostname: 'api.vercel.com',
      path: `/v10/projects/${PROJECT_ID}/env/${id}`,
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + TOKEN }
    };
    const req = https.request(opts, res => {
      let d = ''; res.on('data', c => d += c);
      res.on('end', () => {
        console.log('Deleted:', key, '| status:', res.statusCode);
        resolve();
      });
    });
    req.on('error', e => { console.log('del err:', e.message); resolve(); });
    req.end();
  });
}

function add(key, value) {
  return new Promise(resolve => {
    const body = JSON.stringify({
      key, value, type: 'encrypted',
      target: ['production', 'preview', 'development']
    });
    const opts = {
      hostname: 'api.vercel.com',
      path: `/v10/projects/${PROJECT_ID}/env`,
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + TOKEN,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    };
    const req = https.request(opts, res => {
      let d = ''; res.on('data', c => d += c);
      res.on('end', () => {
        const j = JSON.parse(d);
        if (j.key) console.log('Added:', j.key, '→', j.type);
        else console.log('Add error', key, ':', JSON.stringify(j).substring(0, 120));
        resolve();
      });
    });
    req.on('error', e => { console.log('add err:', e.message); resolve(); });
    req.write(body); req.end();
  });
}

(async () => {
  // Delete the sensitive ones
  await del('z9Ifz9ALJm9Z2yjS', 'DATABASE_URL');
  await del('ZubEnCVWvku6kzB1', 'DIRECT_URL');

  // Recreate as encrypted
  await add('DATABASE_URL', 'postgresql://postgres.kjjrohqfuqffljliflye:penta%40%40net12345@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true');
  await add('DIRECT_URL', 'postgresql://postgres.kjjrohqfuqffljliflye:penta%40%40net12345@aws-0-ap-south-1.pooler.supabase.com:5432/postgres');

  console.log('Done! Redeploy now.');
})();
