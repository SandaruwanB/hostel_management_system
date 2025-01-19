const { Op } = require('sequelize');
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


module.exports.getUpdateView = async (req,res)=>{
    const reqId = req.params.id;

    const maintainerDetails = await maintainers.findOne({
        where : {
            id : reqId
        }
    });

    res.render('user/forms/maintainers', {maintainer : maintainerDetails});
}

module.exports.update = async (req,res)=>{
    const reqId = req.params.id;
    const { callingName, fullName, nic, jobRole, workStart, workEnd, address, contact, emergencyContact } = req.body;   

    await maintainers.findAll({
        where : {
            [Op.and] : [
                {nic : nic},
                {id : {[Op.ne] : reqId}}
            ]
        }
    }).then(async (existing)=>{
        if (existing.length > 0){
            res.json({result : `NIC ${nic} already have to maintainer`});
        } else {
            await maintainers.findOne({
                id : reqId
            }).then(async (maintainer)=>{
                await maintainer.update({
                    callingName : callingName,
                    nic : nic,
                    fullName : fullName,
                    jobRole : jobRole,
                    workStartedDate : workStart,
                    workEndDate : workEnd,
                    address : address,
                    contact : contact,
                    emergencyContact : emergencyContact
                }).then(()=>{
                    res.json({result : "success"});
                })
            });
        }
    });
}