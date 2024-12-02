const { where } = require('sequelize');
const users = require('../models/users');

module.exports.authCheck = async (req, res, next)=>{
    if (req.session.userid){
        const user = await users.findOne({
            where : {
                id : req.session.userid
            }
        });
        next();
    }
    else{
        res.redirect('/');
    }
}