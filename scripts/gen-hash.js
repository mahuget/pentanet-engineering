// Run: node scripts/gen-hash.js
// Generates bcrypt hash for admin password
const bcrypt = require("bcryptjs");
const password = "Penta@Admin2026!";
const hash = bcrypt.hashSync(password, 12);
console.log("ADMIN_PASSWORD_HASH=" + hash);
console.log("\nAdd this to your .env.local and Vercel environment variables.");
