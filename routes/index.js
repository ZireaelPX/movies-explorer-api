const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { validationLogin, validationCreateUser } = require('../middlewares/validate');
const NotFound = require('../errors/not-found-error');

router.post('/signin', validationLogin, login);
router.post('/signup', validationCreateUser, createUser);

router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use(auth, userRouter);
router.use(auth, movieRouter);

router.use('*', (req, res, next) => {
  next(new NotFound('Извините, страница не найдна...'));
});

module.exports = router;
