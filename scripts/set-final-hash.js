/**
 * Sets the final ADMIN_PASSWORD_HASH on Vercel.
 * Hash was generated locally with bcrypt cost 12 and verified.
 * Run: node scripts/set-final-hash.js
 */
const https = require('https');
const TOKEN = process.env.VERCEL_TOKEN;
const PROJECT_ID = 'prj_XKJYAuIhFsu2YhuQNNs5Tt2Kvlxs';

// bcrypt hash of "Penta@Admin2026!" — cost factor 12, verified locally
// Stored in a JS string to avoid PowerShell $ interpolation issues
const BCRYPT_HASH = [
  '$2a$12$S9RwqZZQno9j2he8gZs2du',
  'rusuCQikhmNUSIb3B6tOlcIzaN3Ho4m'
].join('');

console.log('Hash to set:', BCRYPT_HASH);
console.log('Hash length:', BCRYPT_HASH.length, '(expected 60)');

function getEnvId(key, cb) {
  const o = { hostname: 'api.vercel.com', path: '/v9/projects/' + PROJECT_ID + '/env', method: 'GET', headers: { 'Authorization': 'Bearer ' + TOKEN } };
  const r = https.request(o, res => { let d = ''; res.on('data', c => d += c); res.on('end', () => { const j = JSON.parse(d); const v = (j.envs || []).find(e => e.key === key); cb(v ? v.id : null); }); });
  r.on('error', e => { console.log(e.message); cb(null); }); r.setTimeout(10000, () => r.destroy()); r.end();
}

function deleteEnv(id, cb) {
  const o = { hostname: 'api.vercel.com', path: '/v10/projects/' + PROJECT_ID + '/env/' + id, method: 'DELETE', headers: { 'Authorization': 'Bearer ' + TOKEN } };
  const r = https.request(o, res => { let d = ''; res.on('data', c => d += c); res.on('end', () => { console.log('Deleted old ADMIN_PASSWORD_HASH, status:', res.statusCode); cb(); }); });
  r.on('error', e => { console.log(e.message); cb(); }); r.end();
}

function addEnv(key, value, cb) {
  const body = JSON.stringify({ key, value, type: 'encrypted', target: ['production', 'preview', 'development'] });
  const o = { hostname: 'api.vercel.com', path: '/v10/projects/' + PROJECT_ID + '/env', method: 'POST', headers: { 'Authorization': 'Bearer ' + TOKEN, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) } };
  const r = https.request(o, res => { let d = ''; res.on('data', c => d += c); res.on('end', () => { const j = JSON.parse(d); console.log(j.key ? 'Set: ' + j.key + ' (type: ' + j.type + ')' : 'Error: ' + JSON.stringify(j).substring(0, 120)); cb(); }); });
  r.on('error', e => { console.log(e.message); cb(); }); r.write(body); r.end();
}

// Run
getEnvId('ADMIN_PASSWORD_HASH', (id) => {
  const doAdd = () => addEnv('ADMIN_PASSWORD_HASH', BCRYPT_HASH, () => console.log('Done. Redeploy to apply.'));
  if (id) {
    deleteEnv(id, doAdd);
  } else {
    doAdd();
  }
});
