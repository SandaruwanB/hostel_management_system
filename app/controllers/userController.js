const { Op } = require('sequelize');
const users = require('../models/users');

module.exports.index = async (req, res)=>{
    const allUsers = await users.findAll({
        where: {
            id: {
                [Op.ne]: req.user.id
            }
        }
    });

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