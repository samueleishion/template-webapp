const fs = require('fs');

ENV_DEFAULTS = {
  "ENV": "DEV",
  "PORT": 4830,
  "MONGODB_HOST": "localhost",
  "MONGODB_PORT": 27017,
  "MONGODB_DB": "db-csuite",
  "MONGODB_USER": "",
  "MONGODB_PASS": "",
  "CERTIFICATE_PATH": "",
  "CERTIFICATE_PASS": ""
}; 

if (
  (process.argv.indexOf('-f') >= 0 || process.argv.indexOf('--force') >= 0) ||
  !fs.existsSync('.env')
){
  // Forcing environment variables to defaults 
  fs.writeFileSync('.env', Object.entries(ENV_DEFAULTS).map(([key, value]) => `${key}=${value}`).join('\n'));
}