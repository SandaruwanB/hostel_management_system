const { signIn } = require('../controllers/authController');
const { authCheck } = require('../middleware/authMiddleware');

const route = require('express').Router();


route.get('/user/dashboard', authCheck, (req,res)=>{
    console.log(req.session.userid);
    res.render('user/dashboard');
});

// auth routes
route.get('/', (req, res)=>{
    res.render('home');
});
route.post('/', signIn);

module.exports = route;