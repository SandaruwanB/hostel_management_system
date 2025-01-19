const { Op } = require('sequelize');
const faculties = require('../models/faculties');

module.exports.index = async (req,res)=>{
    const facultyList = await faculties.findAll({
        order : [
            ['id' , 'DESC']
        ]
    }); 
    res.render('user/faculty', {user : req.user, faculties : facultyList})
}

module.exports.getCreateView = (req,res)=>{
    res.render('user/forms/faculty', {user : req.user});
}

module.exports.create = async (req,res)=>{
    await faculties.findOne({
        where : {
            name: req.body.name
        }
    }).then(async (faculty)=>{
        if (faculty){
            res.json({"result" : "This faculty already exists."})
        }
        else{
            await faculties.create({
                name : req.body.name,
                location : req.body.location,
                hod_name : req.body.hodName,
                hod_cantact : req.body.hodContact,
                hod_address : req.body.hodAddress
            }).then(()=>{
                res.json({"result" : "success"});
            })
        }
    })
}

module.exports.getUpdateView = async (req, res)=>{
    const reqId = req.params.id;
    const selectedFaculty = await faculties.findOne({
        where : {
            'id' : reqId
        }
    });

    res.render('user/forms/faculty', {faculty : selectedFaculty});
}

module.exports.update = async (req,res)=>{
    const reqId = req.params.id;
    const { name, location, hodName, hodContact, hodAddress} = req.body;
    
    await faculties.findAll({
        where : {
            [Op.and] : [
                {name : name},
                {id : {[Op.ne] : reqId}}
            ]
        }
    }).then(async (faculty)=>{
        if (faculty.length > 0){
            res.json({result : `Faculty ${name} already exits`});
        }
        else {
            await faculties.findOne({
                where : {
                    id : reqId
                }
            }).then( async (faculty)=>{
                faculty.update({
                    name : name,
                    location : location,
                    hod_name : hodName,
                    hod_cantact : hodContact,
                    hod_address : hodAddress
                }).then(()=>{
                    res.json({result : "success"});
                });
            });
        }
    })

    
}