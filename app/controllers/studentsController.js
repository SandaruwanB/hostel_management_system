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

    res.render('user/forms/student/create', {faculties : facultyList, users : userAccounts});
}

module.exports.create = async (req, res)=>{
    const { full_name, registration_number, permanant_address, temporary_address, contact, email, account, faculty, guardians_name, guardians_contact, guardians_email} = req.body;

    await students.findOne({
        where : {
            registration_number : registration_number
        }
    }).then( async (existing)=>{
        if (existing){
            res.json({result : "This student already exists"});
        } else {
            await students.findOne({
                where : {
                    userAccountId : account
                }
            }).then( async (student)=>{
                if (student){
                    res.json({result : "Selected account linked to another student"});
                } else {
                    await students.create({
                        full_name : full_name,
                        registration_number : registration_number,
                        permanant_address : permanant_address,
                        temporary_address : temporary_address,
                        contact : contact,
                        email : email,
                        guardians_name : guardians_name,
                        guardians_contact : guardians_contact,
                        guardians_email : guardians_email,
                        userAccountId : account ? account : null,
                        facultyId : faculty
                    }).then(()=>{
                        res.json({result : "success"});
                    });
                }
            });
        }
    });
}

module.exports.getUpdateView = async (req, res)=>{
    const reqId = req.params.id;

    const studentDetails = await students.findOne({
        where : {
            id : reqId
        },
        include : [
            {
                model : users,
                as : 'userAccount'
            },
            {
                model : faculties,
                as : 'faculty',
            }
        ]
    });
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

    res.render('user/forms/student/edit', {faculties : facultyList, users : userAccounts, student : studentDetails});
}