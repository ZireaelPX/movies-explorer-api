const Movie = require('../models/movie');
const BadRequest = require('../errors/bad-request');
const NotFound = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

// @desc Get movies
// @route GET /movies
// @access Private func
module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      if (!movies) {
        throw new NotFound('Данные не найдены!');
      }
      res.send(movies);
    })
    .catch(next);
};

// @desc Create movies
// @route POST /movies
// @access Private func
module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;

  Movie.create({ owner, ...req.body })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequest('Извините, переданы некорректные данные');
      }
      next(err);
    })
    .catch(next);
};

// @desc Delete movies
// @route DELETE /movies/:movieId
// @access Private func
module.exports.deleteMovie = (req, res, next) => {
  const userId = req.user._id;
  const { movieId } = req.params;

  Movie.findById(movieId)
    .orFail(() => {
      throw new NotFound('Фильм с указанным _id не найден. Попробуйте ещё раз...');
    })
    .then((movie) => {
      if (movie.owner.toString() === userId) {
        return Movie.findByIdAndRemove(movieId)
          .then((deletedMovie) => res.send(deletedMovie))
          .catch(next);
      }
      throw new ForbiddenError('Нельзя выполнить данный запрос');
    })
    .catch(next);
};
