const rateLimit = require('express-rate-limit');

const { errorMessages } = require('../utils/constants');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  headers: true,
  message: errorMessages.tooManyRequests,
});

const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  headers: true,
  message: errorMessages.tooManyCreateAccountRequests,
});

module.exports = {
  apiLimiter,
  createAccountLimiter,
};
