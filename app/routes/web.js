const { authCheck } = require('../middleware/authMiddleware');

const route = require('express').Router();

route.get('/', (req, res)=>{
    req.session.userid = 10;
    console.log(req.session);
    res.render('home');
});
route.get('/user/dashboard', authCheck, (req,res)=>{
    console.log(req.session.userid);
    res.render('user/dashboard');
})

module.exports = route;