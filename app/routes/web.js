const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const dashboardController = require('../controllers/dashboardController');
const { authCheck, isAuthenticated } = require('../middleware/authMiddleware');

const route = require('express').Router();


route.get('/user/dashboard', authCheck, dashboardController.index);
route.get('/user/users', authCheck, userController.index);

// auth routes
route.get('/', isAuthenticated, (req, res)=>{
    res.render('home');
});
route.post('/', isAuthenticated, authController.signIn);
route.post('/signout', authCheck, authController.signout);

module.exports = route;