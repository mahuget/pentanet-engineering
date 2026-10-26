// Updates ADMIN_PASSWORD_HASH on Vercel to use SHA-256 (no $ signs)
// Run: node scripts/update-hash.js
const https = require('https');
const TOKEN = process.env.VERCEL_TOKEN;
const PROJECT_ID = 'prj_XKJYAuIhFsu2YhuQNNs5Tt2Kvlxs';

// SHA-256 of "Penta@Admin2026!" — verified locally
const NEW_HASH = '1d774e7fe17af71262187ae98db6de755bac93bbbd6d7dc51018ee64115c6dab';

function getEnvId(cb) {
  const o = { hostname: 'api.vercel.com', path: '/v9/projects/' + PROJECT_ID + '/env', method: 'GET', headers: { 'Authorization': 'Bearer ' + TOKEN } };
  const r = https.request(o, res => { let d = ''; res.on('data', c => d += c); res.on('end', () => { const j = JSON.parse(d); const v = (j.envs||[]).find(e => e.key === 'ADMIN_PASSWORD_HASH'); cb(v ? v.id : null); }); });
  r.on('error', e => { console.log(e.message); cb(null); });
  r.setTimeout(10000, () => r.destroy()); r.end();
}

function deleteEnv(id, cb) {
  const o = { hostname: 'api.vercel.com', path: '/v10/projects/' + PROJECT_ID + '/env/' + id, method: 'DELETE', headers: { 'Authorization': 'Bearer ' + TOKEN } };
  const r = https.request(o, res => { let d = ''; res.on('data', c => d += c); res.on('end', () => { console.log('Deleted old hash, status:', res.statusCode); cb(); }); });
  r.on('error', e => { console.log(e.message); cb(); }); r.end();
}

function addEnv(cb) {
  const body = JSON.stringify({ key: 'ADMIN_PASSWORD_HASH', value: NEW_HASH, type: 'plain', target: ['production', 'preview', 'development'] });
  const o = { hostname: 'api.vercel.com', path: '/v10/projects/' + PROJECT_ID + '/env', method: 'POST', headers: { 'Authorization': 'Bearer ' + TOKEN, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) } };
  const r = https.request(o, res => { let d = ''; res.on('data', c => d += c); res.on('end', () => { const j = JSON.parse(d); console.log(j.key ? 'Added new hash: ' + j.key + ' type:' + j.type : 'Response: ' + JSON.stringify(j).substring(0, 100)); cb(); }); });
  r.on('error', e => { console.log(e.message); cb(); }); r.write(body); r.end();
}

function deploy(cb) {
  const body = JSON.stringify({ name: 'pentanet-engineering-kvw7', gitSource: { type: 'github', repoId: '1432169625', ref: 'main' } });
  const o = { hostname: 'api.vercel.com', path: '/v13/deployments', method: 'POST', headers: { 'Authorization': 'Bearer ' + TOKEN, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) } };
  const r = https.request(o, res => { let d = ''; res.on('data', c => d += c); res.on('end', () => { const j = JSON.parse(d); console.log('Deploy ID:', j.id); cb(j.id); }); });
  r.on('error', e => { console.log(e.message); cb(null); }); r.write(body); r.end();
}

function waitReady(id, n) {
  setTimeout(() => {
    const o = { hostname: 'api.vercel.com', path: '/v13/deployments/' + id, method: 'GET', headers: { 'Authorization': 'Bearer ' + TOKEN } };
    const r = https.request(o, res => { let d = ''; res.on('data', c => d += c); res.on('end', () => {
      const j = JSON.parse(d);
      console.log('[' + n + ']', new Date().toLocaleTimeString(), j.readyState);
      if (j.readyState === 'READY') {
        const ab = JSON.stringify({ alias: 'pentanet-engineering-kvw7.vercel.app' });
        const ao = { hostname: 'api.vercel.com', path: '/v2/deployments/' + id + '/aliases', method: 'POST', headers: { 'Authorization': 'Bearer ' + TOKEN, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(ab) } };
        https.request(ao, () => {}).on('error', () => {}).end(ab);
        console.log('\n=== LOGIN DETAILS ===');
        console.log('URL:      https://pentanetengineering.com/admin');
        console.log('Email:    admin@pentanetengineering.com');
        console.log('Password: Penta@Admin2026!');
      } else if (j.readyState === 'ERROR') {
        console.log('FAILED:', j.errorMessage);
      } else if (n < 35) { waitReady(id, n + 1); }
    }); });
    r.on('error', () => { if (n < 35) waitReady(id, n + 1); });
    r.setTimeout(10000, () => r.destroy()); r.end();
  }, 12000);
}

// Run
getEnvId(id => {
  if (id) {
    deleteEnv(id, () => addEnv(() => deploy(depId => { if (depId) waitReady(depId, 1); })));
  } else {
    addEnv(() => deploy(depId => { if (depId) waitReady(depId, 1); }));
  }
});
