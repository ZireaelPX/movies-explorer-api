const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/unauthorized-error');
const { errorMessages } = require('../utils/constants');

const { JWT_SECRET } = require('../utils/config');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new UnauthorizedError(errorMessages.invalidAuthUserData);
    }
    req.user = payload;
    next();
  } else {
    next(new UnauthorizedError(errorMessages.needAuth));
  }
  return null;
};
