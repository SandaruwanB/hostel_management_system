const payments = require('../models/payments');
const students = require('../models/students');

module.exports.index = async (req, res)=>{
    const paymentDetails = await payments.findAll({
        include : [
            {
                model : students,
                as : "student"
            }
        ]
    });
    res.render('user/payments', {user : req.user, payments : paymentDetails});
}

module.exports.getCreateView = async (req, res)=>{
    const studentsDetails = await students.findAll();
    console.log(studentsDetails);
    res.render('user/forms/payments', {user : req.user, students : studentsDetails});
}