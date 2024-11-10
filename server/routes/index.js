const express = require('express');
const router = express.Router();
const todoRoutes = require('./todo-routes');
const userRoutes = require('./user-routes');

router.use('/user', userRoutes);
router.use('/todo', todoRoutes);

module.exports = router;
