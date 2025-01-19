const { Op } = require('sequelize');
const complaints = require('../models/complaints');
const users = require('../models/users');

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

module.exports.getReadView = (req,res)=>{
    res.render('user/forms/complaints', {user : req.user});
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