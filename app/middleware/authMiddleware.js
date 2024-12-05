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
        req.user = user;
        console.log(user);
        next();
    }
    catch(err){
        res.clearCookie("session");
        return res.redirect('/');
    }
}