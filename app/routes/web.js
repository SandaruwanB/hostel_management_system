const route = require('express').Router();
const userController = require('../controllers/userController');
require('../../database/connection');

route.get('/', userController.index);

module.exports = route