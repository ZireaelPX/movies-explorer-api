const router = require('express').Router();
const { getUser, updateUser } = require('../controllers/users');
const { validationGetUserInfo, validationUpdateUserInfo } = require('../middlewares/validate');

router.get('/me', validationGetUserInfo, getUser);
router.patch('/me', validationUpdateUserInfo, updateUser);

module.exports = router;
