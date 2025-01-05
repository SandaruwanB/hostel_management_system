const bcrypt = require('bcrypt');
const data = require('../../config');
const users = require('../models/users');
const roles = require('../models/roles');
const { where, Op } = require('sequelize');
const jwt = require('jsonwebtoken');

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
            },
        ],
    }).then((userData)=>{
        if (userData){
            bcrypt.compare(password, userData.password).then((result)=>{
                if(result){
                    const user = {
                        'name' : userData.userName,
                        'role' : userData.role
                    };
                    const token = jwt.sign(userData.id, data.app_key);
                    res.cookie("session", token);
                    res.json({result : "success", user});
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

module.exports.signout = (req,res)=>{
    res.clearCookie("session");
    return res.redirect('/');
}