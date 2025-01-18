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


// admin and manager routes
route.get('/user/dashboard', authCheck, dashboardController.index);

route.get('/user/users', authCheck, userController.index);
route.get('/user/users/add', authCheck, userController.getCreateView);
route.get('/user/users/:id', authCheck, userController.getEditView);
route.post('/user/users/add', authCheck, userController.create);

route.get('/user/students', authCheck, studentsController.index);
route.get('/user/students/add', authCheck, studentsController.getCreateView);
route.get('/user/students/:id', authCheck, studentsController.getUpdateView);
route.post('/user/students/add', authCheck, studentsController.create);

route.get('/user/payments', authCheck, paymentsController.index);
route.get('/user/payments/add', authCheck, paymentsController.getCreateView);
route.get('/user/payments/:id', authCheck, paymentsController.getUpdateView);
route.post('/user/payments/add', authCheck, paymentsController.create);

route.get('/user/maintainers', authCheck, maintainersController.index);
route.get('/user/maintainers/add', authCheck, maintainersController.getCreateView);
route.get('/user/maintainers/:id', authCheck, maintainersController.getUpdateView);
route.post('/user/maintainers/add', authCheck, maintainersController.create);

route.get('/user/complaints', authCheck, complaintsController.index);
route.get('/user/complaints/:id', authCheck, complaintsController.getReadView);

route.get('/user/faculty', authCheck, facultyController.index);
route.get('/user/faculty/add', authCheck, facultyController.getCreateView);
route.get('/user/faculty/:id', authCheck, facultyController.getUpdateView);
route.post('/user/faculty/add', authCheck, facultyController.create);



// auth routes
route.get('/', isAuthenticated, (req, res)=>{
    res.render('home');
});
route.post('/', isAuthenticated, authController.signIn);
route.post('/signout', authCheck, authController.signout);

module.exports = route;