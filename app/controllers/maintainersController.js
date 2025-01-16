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

module.exports.create = async (req,res)=>{
    const { callingName, fullName, nic, jobRole, workStart, workEnd, address, contact, emergencyContact } = req.body;    
    
    await maintainers.findOne({
        where : {
            nic : nic
        }
    }).then(async (existing)=>{
        if (existing) {
            res.json({result : "This maintainer already exists"});
        } else {
            await maintainers.create({
                callingName : callingName,
                nic : nic,
                fullName : fullName,
                jobRole : jobRole,
                workStartedDate : workStart,
                workEndDate : workEnd,
                address : address,
                contact : contact,
                emergencyContact : emergencyContact
            }).then((maintainer)=>{
                res.json({result : "success"});
            });
        }
    });
}