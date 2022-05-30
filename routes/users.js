const routerUsers = require('express').Router();

const { validateUpdateUserInfo } = require('../middlewares/validation');
const {
  getUserInfo,
  updateUserInfo,
} = require('../controllers/users');

routerUsers.get('/me', getUserInfo);

routerUsers.patch(
  '/me',
  validateUpdateUserInfo,
  updateUserInfo,
);

module.exports = routerUsers;
