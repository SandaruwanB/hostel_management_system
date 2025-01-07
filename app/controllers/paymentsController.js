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

module.exports.getCreateView = (req, res)=>{
    res.render('user/forms/payments', {user : req.user});
}