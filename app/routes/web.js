const { signIn } = require('../controllers/authController');
const { index } = require('../controllers/userController');
const { authCheck, isAuthenticated } = require('../middleware/authMiddleware');

const route = require('express').Router();


route.get('/user/dashboard', authCheck, (req,res)=>{
    res.render('user/dashboard');
});
route.get('/user/users', authCheck, index);

// auth routes
route.get('/', isAuthenticated, (req, res)=>{
    res.render('home');
});
route.post('/', isAuthenticated, signIn);

module.exports = route;