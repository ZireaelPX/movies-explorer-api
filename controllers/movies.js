const Movie = require('../models/movie');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const { errorMessages } = require('../utils/constants');

module.exports.getMovies = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const savedMovies = await Movie.find({ owner: userId });

    res.send(savedMovies);
  } catch (error) {
    next(error);
  }
};

module.exports.createMovie = async (req, res, next) => {
  const owner = req.user._id;
  const {
    movieId,
    nameRU,
    nameEN,
    description,
    duration,
    year,
    country,
    director,
    image,
    trailer,
    thumbnail,
  } = req.body;

  try {
    const movie = await Movie.create({
      movieId,
      nameRU,
      nameEN,
      description,
      duration,
      year,
      country,
      director,
      image,
      trailer,
      thumbnail,
      owner,
    });

    res.send(movie);
  } catch (error) {
    let err = error;

    if (error.name === 'ValidationError') {
      err = new BadRequestError(errorMessages.invalidCreateMovieData);
    }

    next(err);
  }
};

module.exports.removeMovie = async (req, res, next) => {
  const userId = req.user._id;
  const { movieId } = req.params;

  try {
    const movie = await Movie.findById(movieId)
      .orFail(() => new NotFoundError(errorMessages.movieNotFound));

    if (movie.owner.toString() !== userId) {
      throw new ForbiddenError(errorMessages.noAccess);
    }

    await movie.remove();

    res.send(movie);
  } catch (error) {
    next(error);
  }

  return null;
};
