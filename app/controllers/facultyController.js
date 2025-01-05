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