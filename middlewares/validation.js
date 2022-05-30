const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const mongoose = require('mongoose');

const { validationErrorMessages } = require('../utils/constants');

module.exports.validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': validationErrorMessages.nameRequired,
        'string.min': validationErrorMessages.nameMinLength,
        'string.max': validationErrorMessages.nameMaxLength,
      }),
    email: Joi.string().required()
      .custom((value, helpers) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helpers.message(validationErrorMessages.emailInvalidUrl);
      })
      .messages({
        'any.required': validationErrorMessages.emailRequired,
      }),
    password: Joi.string().required()
      .custom((value, helpers) => {
        if (validator.isStrongPassword(value, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 0,
        })) {
          return value;
        }
        return helpers.message(validationErrorMessages.passwordNotStrong);
      })
      .messages({
        'any.required': validationErrorMessages.passwordRequired,
      }),
  }),
});

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().label('Da')
      .custom((value, helpers) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helpers.message(validationErrorMessages.emailInvalidUrl);
      })
      .messages({
        'string.required': validationErrorMessages.emailRequired,
      }),
    password: Joi.string().required()
      .messages({
        'any.required': validationErrorMessages.passwordRequired,
      }),
  }),
});

module.exports.validateUpdateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': validationErrorMessages.nameRequired,
        'string.min': validationErrorMessages.nameMinLength,
        'string.max': validationErrorMessages.nameMaxLength,
      }),
    email: Joi.string().required().email()
      .custom((value, helpers) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helpers.message(validationErrorMessages.emailInvalidUrl);
      })
      .messages({
        'any.required': validationErrorMessages.emailRequired,
      }),
  }),
});

module.exports.validateCreateMovie = celebrate({
  body: Joi.object().keys({
    movieId: Joi.number().required()
      .messages({
        'any.required': validationErrorMessages.movieIdRequired,
      }),
    nameRU: Joi.string().required()
      .messages({
        'any.required': validationErrorMessages.nameRuRequired,
      }),
    nameEN: Joi.string().required()
      .messages({
        'any.required': validationErrorMessages.nameEnRequired,
      }),
    description: Joi.string().required()
      .messages({
        'any.required': validationErrorMessages.descriptionRequired,
      }),
    duration: Joi.number().required()
      .messages({
        'any.required': validationErrorMessages.durationRequired,
      }),
    year: Joi.string().required()
      .messages({
        'any.required': validationErrorMessages.yearRequired,
      }),
    country: Joi.string().required()
      .messages({
        'any.required': validationErrorMessages.countryRequired,
      }),
    director: Joi.string().required()
      .messages({
        'any.required': validationErrorMessages.directorRequired,
      }),
    image: Joi.string().required()
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message(validationErrorMessages.imageInvalidUrl);
      })
      .messages({
        'any.required': validationErrorMessages.imageRequired,
      }),
    trailer: Joi.string().required()
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message(validationErrorMessages.trailerInvalidUrl);
      })
      .messages({
        'any.required': validationErrorMessages.trailerRequired,
      }),
    thumbnail: Joi.string().required()
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message(validationErrorMessages.thumbnailInvalidUrl);
      })
      .messages({
        'any.required': validationErrorMessages.thumbnailRequired,
      }),
  }),
});

module.exports.validateRemoveMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required()
      .custom((value, helpers) => {
        if (mongoose.isValidObjectId(value)) {
          return value;
        }
        return helpers.message(validationErrorMessages.movieIdInvalid);
      })
      .messages({
        'any.required': validationErrorMessages.movieIdRequired,
      }),
  }),
});
