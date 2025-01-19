const students = require('../models/students');
const maintainers = require('../models/maintainers');
const faculties = require('../models/faculties');
const users = require('../models/users');
const payments = require('../models/payments');


module.exports.index = async (req,res)=>{
    const studentDetails = await students.findAll();
    const usersDetails = await users.findAll();
    const maintainersDetails = await maintainers.findAll();
    const facultyDetails = await faculties.findAll();
    const paymentDetails = await payments.findAll();
    let totalPaid = 0;

    for (const payment of paymentDetails){
        totalPaid += payment.amount;
    }

    res.render('user/dashboard', {user : req.user, studentCount : studentDetails.length, usersCount : usersDetails.length, maintainersCount : maintainersDetails.length, facultyCount : facultyDetails.length, paid : totalPaid});
}