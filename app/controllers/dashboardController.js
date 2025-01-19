const students = require('../models/students');
const maintainers = require('../models/maintainers');
const faculties = require('../models/faculties');
const users = require('../models/users');
const payments = require('../models/payments');
const complaints = require('../models/complaints');


module.exports.index = async (req,res)=>{
    let totalPaid = 0;
    const studentDetails = await students.findAll();
    const usersDetails = await users.findAll();
    const maintainersDetails = await maintainers.findAll();
    const facultyDetails = await faculties.findAll();
    const paymentDetails = await payments.findAll();
    const recentComplaints = await complaints.findAll({
        include : [
            {
                model : users,
                as : 'user'
            }
        ],
        order : [
            ['id', 'DESC']
        ],
        limit : 5,
    });
    const recentPayments = await payments.findAll({
        include : [
            {
                model : students,
                as : 'student'
            }
        ],
        order : [
            ['id' , 'DESC']
        ],
        limit : 5
    });

    for (const payment of paymentDetails){
        totalPaid += payment.amount;
    }

    res.render('user/dashboard', {user : req.user, recentPayments : recentPayments, recentComplaints : recentComplaints, studentCount : studentDetails.length, usersCount : usersDetails.length, maintainersCount : maintainersDetails.length, facultyCount : facultyDetails.length, paid : totalPaid});
}