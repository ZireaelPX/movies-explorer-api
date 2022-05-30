const router = require('express').Router();

const NotFoundError = require('../errors/not-found-error');
const { errorMessages } = require('../utils/constants');
const { validateLogin, validateCreateUser } = require('../middlewares/validation');
const { createAccountLimiter } = require('../middlewares/limiter');
const auth = require('../middlewares/auth');
const routerUsers = require('./users');
const routerMovies = require('./movies');
const {
  createUser,
  login,
  logout,
} = require('../controllers/users');

router.post(
  '/signup',
  createAccountLimiter,
  validateCreateUser,
  createUser,
);

router.post(
  '/signin',
  validateLogin,
  login,
);

router.use(auth);

router.use('/users', routerUsers);
router.use('/movies', routerMovies);
router.get('/signout', logout);

router.all('*', (req, res, next) => next(new NotFoundError(errorMessages.pageNotFound)));

module.exports = router;
