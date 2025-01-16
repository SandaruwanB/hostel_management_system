const students = require('../models/students');
const users = require('../models/users');
const faculties = require('../models/faculties');
const roles = require('../models/roles');

module.exports.index = async (req,res)=>{
    const allStudents = await students.findAll();
    res.render('user/students', {user : req.user, students : allStudents});
}

module.exports.getCreateView = async (req,res)=>{
    const userRole = await roles.findOne({
        where : {
            name : "student"
        }
    });
    const userAccounts = await users.findAll({
        where : {
            roleId : userRole.id
        },
        order : [
            ['id', 'DESC']
        ]
    });
    const facultyList = await faculties.findAll();

    res.render('user/forms/students', {faculties : facultyList, users : userAccounts});
}