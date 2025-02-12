const students = require('../models/students');
const users = require('../models/users');
const faculties = require('../models/faculties');
const roles = require('../models/roles');
const outtime = require('../models/outtime');
const rooms = require('../models/rooms');
const { Op } = require('sequelize');

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
    const userRooms = await rooms.findAll();
    const facultyList = await faculties.findAll();

    res.render('user/forms/student/create', {faculties : facultyList, users : userAccounts, rooms : userRooms});
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
                        facultyId : faculty,
                        status : true,
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
            },
            {
                model : rooms,
                as : 'room'
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
    const userRooms = await rooms.findAll();
    const facultyList = await faculties.findAll();

    res.render('user/forms/student/edit', {faculties : facultyList, users : userAccounts, student : studentDetails, rooms  : userRooms});
}


module.exports.update = async (req,res)=>{
    const reqId = req.params.id;
    const { full_name, registration_number, permanant_address, temporary_address, contact, email, account, faculty, guardians_name, guardians_contact, guardians_email} = req.body;

    await students.findAll({
        where : {
            [Op.and] : [
                {registration_number : registration_number},
                {id : {[Op.ne] : reqId}}
            ]
        }
    }).then(async (existing)=>{
        if (existing.length > 0){
            res.json({result : "This student is already in system"});
        } else {
            await students.findAll({
                where : {
                    [Op.and] : [
                        {userAccountId : account},
                        {id : {[Op.ne] : reqId}}
                    ]
                }
            }).then(async (accountUser)=>{
                if (accountUser.length > 0){
                    res.json({result : "This account is linked to another person"});
                } else {
                    await students.findOne({
                        where : {
                            id : reqId
                        }
                    }).then(async (student)=>{
                        await student.update({
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
                            facultyId : faculty,
                        }).then(()=>{
                            res.json({result : "success"});
                        });
                    });
                }
            });
        }
    });
}

module.exports.markInOrOut = async (req, res)=>{
    const { student, is_out, reason } = req.body;

    if (is_out == 'true'){
        await students.findOne({
            where : {
                id : student
            }
        }).then(async (existing)=>{
            if (existing.status == 1){
                await existing.update({
                    status : false
                }).then(async ()=>{
                    await outtime.create({
                        reason : reason,
                        is_out : true,
                        studentId : existing.id
                    }).then(()=>{
                        res.json({result : "success"});
                    });
                });
            } else {
                res.json({result : "This student already out from hostel"})
            }
        });
    } else {
        await students.findOne({
            where : {
                id : student
            }
        }).then(async (existing)=>{
            if (existing.status == 1){
                res.json({result : "This student already in the hostel"})
            } else {
                await existing.update({
                    status : true
                }).then(async ()=>{
                    var currentdate = new Date(); 
                    await outtime.create({
                        reason : `Student in on ${currentdate}`,
                        is_out : false,
                        studentId : existing.id
                    }).then(()=>{
                        res.json({result : "success"});
                    });
                });
            }
        });
    }
}

module.exports.delete = async (req, res)=>{
    const reqId = req.params.id;

    await students.destroy({
        where : {
            id : reqId
        }
    }).then(()=>{
        res.json({result : "success"});
    });
}


module.exports.getStudentLog = async (req,res)=>{
    const {id} = req.params;

    const student = await students.findOne({
        where : {
            id : id
        }
    });

    const log = await outtime.findAll({
        where : {
            studentId : id
        }
    });

    res.render('user/log', {student : student, log : log});
}