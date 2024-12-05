const bcrypt = require('bcrypt');
const users = require('../models/users');
const roles = require('../models/roles');
const { where, Op } = require('sequelize');


module.exports.signIn = async (req, res)=>{
    const { username, password } = req.body;

    await users.findOne({
        where : {
            [Op.or] : [
                {userName : username},
                {email : username}
            ]
        },
        include: [
            {
                model: roles,
                as: 'role',
                attributes: ['name'],
            },
        ],
    }).then((user)=>{
        if (user){
            bcrypt.compare(password, user.password).then((result)=>{
                if(result){
                    res.json({result : "success", user });
                }else{
                    res.json({result : "Incorrect password"});
                }
            });
        }
        else{
            res.json({result : 'Account not found'});
        }
    });
}

module.exports.signUp = (req, res)=>{

}

module.exports.forgotPassword = (req, res)=>{

}

module.exports.resetPassword = (req, res)=>{
    
}