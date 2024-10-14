const route = require('express').Router();
const userController = require('../controllers/userController');

route.get('/', userController.index);

module.exports = route