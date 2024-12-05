const jwt = require('jsonwebtoken');
const users = require('../models/users');
const roles = require('../models/roles');
const data = require('../../config');

module.exports.authCheck = async (req, res, next)=>{
    console.log(req.cookies);
    try{
        const token = req.cookies.session;
        const uid = jwt.verify(token, data.app_key);
        const user = await users.findOne({
            where : {
                id : uid
            },
            include: [
                {
                    model: roles,
                    as: 'role',
                },
            ],
        });
        if(user){
            req.user = user;
            next();
        }
        else{
            res.clearCookie("session");
            return res.redirect('/');
        }
    }
    catch(err){
        res.clearCookie("session");
        return res.redirect('/');
    }
}

module.exports.isAuthenticated = async (req, res, next)=>{
    try{
        const token = req.cookies.session;
        const uid = jwt.verify(token, data.app_key);

        const user = await users.findOne({
            where : {
                id : uid
            },
            include: [
                {
                    model: roles,
                    as: 'role',
                },
            ],
        }); 

        if (user){
            if (user.role.name == "student"){
                return res.redirect('/student/dashboard');
            }
            else{
                return res.redirect('/user/dashboard');
            }
        }
        else{
            res.clearCookie("session");
            return res.redirect('/');
        }
    }
    catch(err){
        next();
    }
}