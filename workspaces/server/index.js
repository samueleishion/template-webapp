const compression = require('compression');
const cors = require('cors');
const dotenv = require('dotenv').config() 
const express = require('express');
const fs = require('fs');
const helmet = require('helmet');
const https = require('https'); 
const Logr = require('logr-js');
const mongoose = require('mongoose');
const path = require('path');
const redirectToHttps = require('./src/middleware/redirect-https');
const authTokenMiddleware = require('./src/middleware/auth-tokens');

// Set environment variables
const {
  ENV,
  PORT,
  MONGODB_HOST,
  MONGODB_PORT,
  MONGODB_DB,
  MONGODB_USER,
  MONGODB_PASS,
  CERTIFICATE_PATH,
  CERTIFICATE_PASS
} = process.env 
const logr = new Logr() 

// Load routes 
const testEndpoints = require('./src/routes/test');
const usersEndpoints = require('./src/routes/users');
const tokensEndpoints = require('./src/routes/tokens');

// Initialize Express app
const app = express();
let certificate = null;

// Connect to MongoDB
mongoose.connect(`mongodb://${MONGODB_HOST}:${MONGODB_PORT}/csuite`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: MONGODB_DB,
  user: MONGODB_USER && MONGODB_USER.length > 0 ? MONGODB_USER : undefined,
  pass: MONGODB_PASS && MONGODB_PASS.length > 0 ? MONGODB_PASS : undefined
})

// Load SSL certificate if in production
if (ENV === 'PROD') {
  if (!CERTIFICATE_PATH || CERTIFICATE_PATH.length === 0) {
    throw new Error('CERTIFICATE_PATH is not set in the environment variables');
  }

  certificate = fs.readFileSync(path.resolve(CERTIFICATE_PATH));
  app.use(redirectToHttps)
}

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());
app.use(cors());
app.use(helmet());
app.use(authTokenMiddleware);

// Define public routes 
app.get('/', (req, res) => {
  logr.info("/");
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
}); 

// Define API routes
app.use('/api', testEndpoints);
app.use('/api', usersEndpoints);
app.use('/api', tokensEndpoints);

// 404 error handling
app.all('/{*splat}', (req, res) => {
  logr.warning(`${req.path} 404 Not Found`);
  
  res.status(404).sendFile(path.join(__dirname, 'static', '404.html'));
});

// Start server with certificate if in production
if (ENV === 'PROD') {
  const options = {
    key: certificate,
    cert: certificate,
    ca: [certificate],
    passphrase: CERTIFICATE_PASS 
  };

  https.createServer(options, app).listen(PORT, () => {
    logr.info(`running ssl on https://localhost:${PORT} [${ENV}]`);
  });
}

// Start server
app.listen(PORT, () => {
  logr.info(`running on http://localhost:${PORT} [${ENV}]`)
});
