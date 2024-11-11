const express = require('express');
const router = express.Router();
const controllers = require('../controllers/todo-controller');

router.get('/', controllers.getProjects);
router.post('/create', controllers.postProjects);
router.patch('/:id', controllers.patchProjectsById);
router.delete('/:id', controllers.deleteProjectByID);
router.delete('/', controllers.deleteAllProjects)

module.exports = router;
