// const fs = require('fs');
import fs from 'fs';

const ENV_DEFAULTS = {
  "ENV": "DEV",
  "API_URL": "http://localhost:4830/api",
  "GOOGLE_AUTH_KEY": "",
}; 

if (
  (process.argv.indexOf('-f') >= 0 || process.argv.indexOf('--force') >= 0) ||
  !fs.existsSync('.env')
){
  // Forcing environment variables to defaults 
  fs.writeFileSync('.env', Object.entries(ENV_DEFAULTS).map(([key, value]) => `VITE_${key}=${value}`).join('\n'));
}