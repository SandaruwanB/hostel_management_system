const students = require('../models/students');

module.exports.index = async (req,res)=>{
    const allStudents = await students.findAll();
    res.render('user/students', {user : req.user, students : allStudents});
}

module.exports.getCreateView = (req,res)=>{
    res.render('user/forms/students');
}