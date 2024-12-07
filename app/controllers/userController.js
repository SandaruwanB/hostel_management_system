const bcrypt = require('bcrypt');
const { Op, where } = require('sequelize');
const users = require('../models/users');
const roles = require('../models/roles');

module.exports.index = async (req, res)=>{
    let allUsers;
    if (req.user.role.name == "admin"){
        allUsers = await users.findAll({
            where: {
                id: {
                    [Op.ne]: req.user.id
                }
            },
            include: [
                {
                    model: roles,
                    as: 'role',
                },
            ],
        });
    }
    else if(req.user.role.name == "manager"){
        allUsers = await users.findAll({
            where : {
                id: {
                    [Op.ne]: req.user.id
                }
            },
            include: [
                {
                    model: roles,
                    as: 'role',
                    where : {
                        name : "student"
                    }
                },
            ],
        });
    }
    else{
        allUsers = [];
    }
    res.render('user/users', {user : req.user, users : allUsers});
}


module.exports.getCreateView = async (req,res)=>{
    let awailableRoles;
    if (req.user.role.name == "admin"){
        awailableRoles = await roles.findAll();
    }
    else if (req.user.role.name == "manager"){
        awailableRoles = await roles.findAll({
            where : {
                name: "student"
            }
        })
    }
    else{
        awailableRoles = []
    }

    res.render('user/forms/users', {'roles' : awailableRoles});
}

module.exports.create = async (req, res)=>{
    const {username,email,role,password} = req.body;
    
    await users.findOne({
        where : {
            [Op.or] : [
                {userName : username},
                {email : email}
            ]
        }
    }).then((user)=>{
        if(user){
            res.json({result : "This user already exists"});
        }
        else{
            bcrypt.hash(password,10, async function (err, hash){
                await users.create({
                'userName' : username,
                'email' : email,
                'password' : hash,
                'status' : false,
                'roleId' : role
                }).then(()=>{
                    res.json({result : "success"});
                });
            });
        }
    });
}

module.exports.update = (req, res)=>{

}

module.exports.delete = (req, res)=>{

}

module.exports.getAll = (req, res)=>{

}

module.exports.getOne = (req, res)=>{
    
}