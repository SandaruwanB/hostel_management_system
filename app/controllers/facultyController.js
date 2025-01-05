const faculties = require('../models/faculties');

module.exports.index = async (req,res)=>{
    const facultyList = await faculties.findAll(); 
    res.render('user/faculty', {user : req.user, faculties : facultyList})
}

module.exports.getCreateView = (req,res)=>{
    res.render('user/forms/faculty', {user : req.user});
}

module.exports.create = async (req,res)=>{

}