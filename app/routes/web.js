const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const dashboardController = require('../controllers/dashboardController');
const studentsController = require('../controllers/studentsController');
const paymentsController = require('../controllers/paymentsController');
const maintainersController = require('../controllers/maintainersController');
const complaintsController = require('../controllers/complaintController');
const facultyController = require('../controllers/facultyController');
const profileController = require('../controllers/profileController');
const roomsController = require('../controllers/roomsController');
const { authCheck, isAuthenticated } = require('../middleware/authMiddleware');

const route = require('express').Router();


// admin and manager routes
route.get('/user/dashboard', authCheck, dashboardController.index);

route.get('/user/users', authCheck, userController.index);
route.get('/user/users/add', authCheck, userController.getCreateView);
route.get('/user/users/:id', authCheck, userController.getEditView);
route.post('/user/users/add', authCheck, userController.create);
route.put('/user/users/:id', authCheck, userController.update);
route.delete('/user/users/:id', authCheck, userController.delete);

route.get('/user/students', authCheck, studentsController.index);
route.get('/user/students/add', authCheck, studentsController.getCreateView);
route.get('/user/students/:id', authCheck, studentsController.getUpdateView);
route.post('/user/students/add', authCheck, studentsController.create);
route.put('/user/students/:id', authCheck, studentsController.update);
route.put('/user/students', authCheck, studentsController.markInOrOut);
route.delete('/user/students/:id', authCheck, studentsController.delete);

route.get('/user/payments', authCheck, paymentsController.index);
route.get('/user/payments/add', authCheck, paymentsController.getCreateView);
route.get('/user/payments/:id', authCheck, paymentsController.getUpdateView);
route.post('/user/payments/add', authCheck, paymentsController.create);
route.delete('/user/payments/:id', authCheck, paymentsController.delete);

route.get('/user/maintainers', authCheck, maintainersController.index);
route.get('/user/maintainers/add', authCheck, maintainersController.getCreateView);
route.get('/user/maintainers/:id', authCheck, maintainersController.getUpdateView);
route.post('/user/maintainers/add', authCheck, maintainersController.create);
route.put('/user/maintainers/:id', authCheck, maintainersController.update);
route.delete('/user/maintainers/:id', authCheck, maintainersController.delete);

route.get('/user/complaints', authCheck, complaintsController.index);
route.get('/user/complaints/:id', authCheck, complaintsController.getReadView);
route.put('/user/complaints/:id', authCheck, complaintsController.update);
route.delete('/user/complaints/:id', authCheck, complaintsController.delete);

route.get('/user/faculty', authCheck, facultyController.index);
route.get('/user/faculty/add', authCheck, facultyController.getCreateView);
route.get('/user/faculty/:id', authCheck, facultyController.getUpdateView);
route.post('/user/faculty/add', authCheck, facultyController.create);
route.put('/user/faculty/:id', authCheck, facultyController.update);
route.delete('/user/faculty/:id', authCheck, facultyController.delete);

route.get('/user/rooms', authCheck, roomsController.index);
route.delete('/user/rooms/:id', authCheck, roomsController.delete);

route.get('/user/account/manage', authCheck, profileController.managerView);
route.post('/user/account/manage', authCheck, profileController.updateUserData);


// auth routes
route.get('/', isAuthenticated, (req, res)=>{
    res.render('home');
});
route.post('/', isAuthenticated, authController.signIn);
route.post('/signout', authCheck, authController.signout);

module.exports = route;