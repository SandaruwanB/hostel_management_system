const { signIn } = require('../controllers/authController');
const { authCheck, isAuthenticated } = require('../middleware/authMiddleware');

const route = require('express').Router();


route.get('/user/dashboard', authCheck, (req,res)=>{
    res.render('user/dashboard');
});

// auth routes
route.get('/', isAuthenticated, (req, res)=>{
    res.render('home');
});
route.post('/', isAuthenticated, signIn);

module.exports = route;