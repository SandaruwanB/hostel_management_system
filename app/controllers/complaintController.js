const { Op } = require('sequelize');
const complaints = require('../models/complaints');
const users = require('../models/users');
const students = require('../models/students');

module.exports.index = async (req,res)=>{
    const unreadComplaints = await complaints.findAll({
        where : {
            status : {
                [Op.eq] : false
            }
        },
        include : [
            {
                model : users,
                as : 'user'
            }
        ],
        order : [
            ['id', 'DESC']
        ]
    });
    const readComplaits = await complaints.findAll({
        where : {
            status : {
                [Op.eq] : true
            }
        },
        include : [
            {
                model : users,
                as : 'user'
            }
        ],
        order : [
            ['id', 'DESC']
        ]
    });
    res.render('user/complaints', {user : req.user, unreadComplaints : unreadComplaints, readComplaints : readComplaits});
}

module.exports.getCreateView = (req,res)=>{
    
}

module.exports.create = (req,res)=>{
    
}

module.exports.getReadView = async (req,res)=>{
    const reqId = req.params.id;

    const complain = await complaints.findOne({
        where : {
            id : reqId
        },
        include : [
            {
                model : users,
                as : 'user'
            }
        ]
    });

    const student = await students.findOne({
        where : {
            userAccountId : complain.user.id
        }
    });

    res.render('user/forms/complaints', {user : req.user, complain : complain, student : student});
}

module.exports.update = async (req,res)=>{
    const reqId = req.params.id;

    await complaints.findOne({
        where : {
            id : reqId
        }
    }).then(async (complain)=>{
        await complain.update({
            status : 1
        }).then(()=>{
            res.json({result : "success"});
        });
    });
}

module.exports.delete = async (req,res)=>{
    const reqId = req.params.id;

    await complaints.destroy({
        where : {
            id : reqId
        }
    }).then(()=>{
        res.json({result : "success"});
    })
}

module.exports.getStudentView = async (req,res)=>{
    res.render('student/complains', {user : req.user});
}