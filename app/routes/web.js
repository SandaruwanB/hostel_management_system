const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const dashboardController = require('../controllers/dashboardController');
const studentsController = require('../controllers/studentsController');
const paymentsController = require('../controllers/paymentsController');
const maintainersController = require('../controllers/maintainersController');
const complaintsController = require('../controllers/complaintController');
const facultyController = require('../controllers/facultyController');
const { authCheck, isAuthenticated } = require('../middleware/authMiddleware');

const route = require('express').Router();


route.get('/user/dashboard', authCheck, dashboardController.index);
route.get('/user/users', authCheck, userController.index);
route.get('/user/users/add', authCheck, userController.getCreateView);
route.get('/user/students', authCheck, studentsController.index);
route.get('/user/payments', authCheck, paymentsController.index);
route.get('/user/maintainers', authCheck, maintainersController.index);
route.get('/user/complaints', authCheck, complaintsController.index);
route.get('/user/faculty', authCheck, facultyController.index);
route.post('/user/users/add', authCheck, userController.create);


// auth routes
route.get('/', isAuthenticated, (req, res)=>{
    res.render('home');
});
route.post('/', isAuthenticated, authController.signIn);
route.post('/signout', authCheck, authController.signout);

module.exports = route;