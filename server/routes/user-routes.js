const express = require('express');
const router = express.Router();
const controllers = require('../controllers/user-controllers');

router.post('/signup', controllers.userSignup);
router.post('/login', controllers.loginUser);
router.get('/', controllers.getUsers);

module.exports = router;
