// const { ALLOWED_CORS, DEFAULT_ALLOWED_METHODS } = require('../utils/constants');

const allowedCors = [
  'http://localhost:3000',
  'http://artempavlov.movies.nomoredomains.xyz',
  'https://artempavlov.movies.nomoredomains.xyz',
  'http://127.0.0.1:5500',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  next();
  return null;
};
