const routerMovies = require('express').Router();

const {
  getMovies,
  createMovie,
  removeMovie,
} = require('../controllers/movies');
const {
  validateCreateMovie,
  validateRemoveMovie,
} = require('../middlewares/validation');

routerMovies.get('/', getMovies);

routerMovies.post(
  '/',
  validateCreateMovie,
  createMovie,
);

routerMovies.delete(
  '/:movieId',
  validateRemoveMovie,
  removeMovie,
);

module.exports = routerMovies;
