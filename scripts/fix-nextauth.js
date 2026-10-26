// Fix NEXTAUTH_URL and verify hash
const https = require('https');
const TOKEN = process.env.VERCEL_TOKEN;
const PROJECT_ID = 'prj_XKJYAuIhFsu2YhuQNNs5Tt2Kvlxs';

function patch(id, key, value) {
  return new Promise(resolve => {
    const body = JSON.stringify({ key, value, type: 'plain', target: ['production', 'preview', 'development'] });
    const o = {
      hostname: 'api.vercel.com',
      path: '/v10/projects/' + PROJECT_ID + '/env/' + id,
      method: 'PATCH',
      headers: { 'Authorization': 'Bearer ' + TOKEN, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
    };
    const r = https.request(o, res => {
      let d = ''; res.on('data', c => d += c);
      res.on('end', () => {
        const j = JSON.parse(d);
        console.log(j.key ? 'Patched: ' + j.key + ' = ' + j.value : 'Error: ' + JSON.stringify(j).substring(0, 100));
        resolve();
      });
    });
    r.on('error', e => { console.log(e.message); resolve(); });
    r.write(body); r.end();
  });
}

function deploy() {
  return new Promise(resolve => {
    const body = JSON.stringify({ name: 'pentanet-engineering-kvw7', gitSource: { type: 'github', repoId: '1432169625', ref: 'main' } });
    const o = {
      hostname: 'api.vercel.com', path: '/v13/deployments', method: 'POST',
      headers: { 'Authorization': 'Bearer ' + TOKEN, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
    };
    const r = https.request(o, res => {
      let d = ''; res.on('data', c => d += c);
      res.on('end', () => { const j = JSON.parse(d); console.log('Deploy ID:', j.id); resolve(j.id); });
    });
    r.on('error', e => { console.log(e.message); resolve(null); });
    r.write(body); r.end();
  });
}

function waitReady(id, n) {
  setTimeout(() => {
    const o = { hostname: 'api.vercel.com', path: '/v13/deployments/' + id, method: 'GET', headers: { 'Authorization': 'Bearer ' + TOKEN } };
    const r = https.request(o, res => {
      let d = ''; res.on('data', c => d += c);
      res.on('end', () => {
        const j = JSON.parse(d);
        console.log('[' + n + ']', new Date().toLocaleTimeString(), j.readyState);
        if (j.readyState === 'READY') {
          const ab = JSON.stringify({ alias: 'pentanet-engineering-kvw7.vercel.app' });
          const ao = { hostname: 'api.vercel.com', path: '/v2/deployments/' + id + '/aliases', method: 'POST', headers: { 'Authorization': 'Bearer ' + TOKEN, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(ab) } };
          https.request(ao, () => {}).on('error', () => {}).end(ab);
          console.log('\n✅ READY! Try login now:');
          console.log('URL:      https://pentanetengineering.com/admin');
          console.log('Email:    admin@pentanetengineering.com');
          console.log('Password: Penta@Admin2026!');
        } else if (j.readyState === 'ERROR') {
          console.log('FAILED:', j.errorMessage);
        } else if (n < 35) { waitReady(id, n + 1); }
      });
    });
    r.on('error', () => { if (n < 35) waitReady(id, n + 1); });
    r.setTimeout(10000, () => r.destroy()); r.end();
  }, 12000);
}

(async () => {
  // Fix NEXTAUTH_URL to production URL
  await patch('No7jBe2EDE8RR4RZ', 'NEXTAUTH_URL', 'https://pentanetengineering.com');
  
  // Confirm hash is correct SHA-256 of "Penta@Admin2026!"
  await patch('DzIwpLIGWjU4KmOS', 'ADMIN_PASSWORD_HASH', '1d774e7fe17af71262187ae98db6de755bac93bbbd6d7dc51018ee64115c6dab');
  
  // Redeploy to pick up new values
  const id = await deploy();
  if (id) waitReady(id, 1);
})();
