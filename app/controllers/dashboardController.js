const students = require('../models/students');
const maintainers = require('../models/maintainers');
const faculties = require('../models/faculties');
const users = require('../models/users');
const payments = require('../models/payments');
const complaints = require('../models/complaints');
const outtime = require('../models/outtime');
const rooms = require('../models/rooms');


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

module.exports.getStudentDashboard = async (req,res)=>{
    let paymentValue = 0;


    const studentAcc = await students.findOne({
        where : {
            userAccountId : req.user.id
        },
        include : [
            {
                model : rooms,
                as : 'room'
            }
        ]
    });

    const complainData = await complaints.findAll({
        where : {
            userId : req.user.id
        },
        order : [
            ['id', 'DESC']
        ],
        limit : 5
    });

    const activities = await outtime.findAll({
        where : {
            studentId : studentAcc.id
        },
        order : [
            ['id', 'DESC']
        ],
        limit : 5
    });

    const paymentsTotal = await payments.findAll({
        where : {
            studentId : studentAcc.id
        }
    });
    paymentsTotal.map((payment, index)=>{
        paymentValue += payment.amount;
    });

    res.render('student/dashboard', {user : req.user, complains : complainData, activities : activities, paidAmount : paymentValue, room : studentAcc.room.room_number, status : studentAcc.status ? "In" : "Out"});
}