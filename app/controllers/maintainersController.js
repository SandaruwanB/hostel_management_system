const maintainers = require('../models/maintainers');

module.exports.index = async (req,res)=>{
    const maintainersList = await maintainers.findAll({
        order : [
            ['id', 'DESC']
        ]
    });

    res.render('user/maintainers', {user : req.user, maintainers : maintainersList});
}

module.exports.getCreateView = (req,res)=>{
    res.render('user/forms/maintainers', {user : req.user});
}

module.exports.create = (req,res)=>{
    
}