const users = require('../models/users');
const bcrypt = require('bcrypt');

module.exports.managerView = async (req, res)=>{
    res.render('user/user', {user : req.user});
}

module.exports.updateUserData = async (req, res)=>{
    const { ispassword, oldpassword, newpassword, userName, email } = req.body;

    if (ispassword == 'true'){
        await users.findOne({
            where : {
                id : req.user.id
            }
        }).then( async (user)=>{
            bcrypt.compare(oldpassword, user.password).then((result)=>{
                if (result){
                    
                } else {
                    res.json({result : "Incorrect old password"});
                }
            });
        });
    }
    else{
        res.json({result : "huuu"});
    }   
}