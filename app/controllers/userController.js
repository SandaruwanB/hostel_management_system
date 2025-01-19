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
            order : [
                ['id', 'DESC']
            ]
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
            order : [
                ['id', 'DESC']
            ]
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

module.exports.getEditView = async (req,res)=>{
    const userId = req.params.id;
    let awailableRoles;

    const userData = await users.findOne({
        where : {
            'id' : userId
        },
        include : [
            {
                model : roles,
                as : 'role'
            }
        ]
    });

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
    res.render('user/forms/users', {'roles' : awailableRoles, user : userData});
}

module.exports.update = async (req, res)=>{
    const reqId = req.params.id;
    const { is_password, username, email, role, password } = req.body;

    if (is_password == 'true'){
        await users.findOne({
            where : {
                id : reqId
            }
        }).then(async (userDetails)=>{
            bcrypt.hash(password,10, async function (err, hash){
                await userDetails.update({
                    'password' : hash
                }).then(()=>{
                    res.json({result : "success"});
                })
            });
        })
    } else {
        await users.findAll({
            where : {
                [Op.and] : [
                    {id : {[Op.ne] : reqId}},
                    {
                        [Op.or] : [
                            {email : email},
                            {userName : username},
                        ]
                    }
                ]
            }
        }).then(async (existing)=>{
            if (existing.length > 0){
                res.json({result : "This user name or email is already in use."});
            } else {
                await users.findOne({
                    where : {
                        id : reqId
                    }
                }).then(async (user)=>{
                    await user.update({
                        'userName' : username,
                        'email' : email,
                        'roleId' : role
                    }).then(()=>{
                        res.json({result : "success"});
                    })
                });
            }
        });
    }
}

module.exports.delete = async (req, res)=>{
    const reqId = req.params.id;
    
    await users.destroy({
        where : {
            id : reqId
        }
    }).then(()=>{
        res.json({result : "success"});
    });    
}