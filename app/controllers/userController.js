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
    else if(req.user.role.name == "admin"){
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

module.exports.create = (req, res)=>{

}

module.exports.update = (req, res)=>{

}

module.exports.delete = (req, res)=>{

}

module.exports.getAll = (req, res)=>{

}

module.exports.getOne = (req, res)=>{
    
}