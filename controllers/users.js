const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const BadRequest = require('../errors/bad-request');
const NotFound = require('../errors/not-found-error');
const ConflictError = require('../errors/conflict-error');

// @desc Get user
// @route GET /users/me
// @access Private func
module.exports.getUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail(() => {
      throw new NotFound('Пользователь по указанному _id не найден. Попробуйте ещё раз...');
    })
    .then((user) => res.send(user))
    .catch(next);
};

// @desc Update user info
// @route GET /users/me
// @access Private func
module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, email }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFound('Пользователь по указанному _id не найден. Попробуйте ещё раз...');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new BadRequest('Извините, переданы некорректные данные');
      }
      if (err.code === 11000) {
        throw new ConflictError('Пользователь с данным email уже существует. Попробуйте ещё раз');
      }
      next(err);
    })
    .catch(next);
};

// @desc Register user
// @route POST /signup
// @access Public func
module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((({ _id }) => User.findById(_id)))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequest('Извините, переданы некорректные данные');
      }
      if (err.code === 11000) {
        throw new ConflictError('Пользователь с данным email уже существует. Попробуйте ещё раз');
      }
      next(err);
    })
    .catch(next);
};

// @desc Authorization user
// @route POST /signin
// @access Public func
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, `${NODE_ENV === 'production' ? JWT_SECRET : 'yandex-praktikum'}`, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};
