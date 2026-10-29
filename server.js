/**
 * server.js
 * ImmoLead Website & API Server (Node.js)
 * Zero external dependencies. Uses Node.js native http, fs, and path modules.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const auditHandler = require('./api/audit');

// Automatically load .env file if it exists
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  if (typeof process.loadEnvFile === 'function') {
    try {
      process.loadEnvFile(envPath);
    } catch (e) {
      console.warn('[Server] Could not load .env with native loader:', e.message);
    }
  } else {
    try {
      const envContent = fs.readFileSync(envPath, 'utf-8');
      envContent.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const idx = trimmed.indexOf('=');
          if (idx !== -1) {
            const key = trimmed.slice(0, idx).trim();
            const val = trimmed.slice(idx + 1).trim().replace(/(^['"]|['"]$)/g, '');
            if (!process.env[key]) process.env[key] = val;
          }
        }
      });
    } catch (e) {}
  }
}

let PORT = parseInt(process.env.PORT || '3000', 10);

// ... rest of server.js
