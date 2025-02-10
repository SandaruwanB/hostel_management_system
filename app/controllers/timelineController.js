const outtime = require('../models/outtime');
const students = require('../models/students');

module.exports.index = async (req,res)=>{
    const student = await students.findOne({
        where : {
            userAccountId : req.user.id
        }
    });

    const outtimeData = await outtime.findAll({
        where : {
            studentId : student.id
        }
    });

    res.render('student/timeline', {user : req.user, outtime : outtimeData});
}