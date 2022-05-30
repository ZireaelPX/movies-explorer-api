const mongoose = require('mongoose');
const validator = require('validator');

const { validationErrorMessages } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'John Smith',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: validationErrorMessages.emailInvalidUrl,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    validate: {
      validator(v) {
        return validator.isStrongPassword(v, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 0,
        });
      },
      message: validationErrorMessages.passwordNotStrong,
    },
  },
});

module.exports = mongoose.model('user', userSchema);
