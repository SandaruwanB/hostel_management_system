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
        },
        order : [
            ['id', 'DESC']
        ]
    });

    res.render('student/timeline', {user : req.user, outtime : outtimeData});
}

module.exports.studentMarkInOut = async (req,res)=>{
    const {is_out,reason} = req.body;

    if (is_out == 'true'){
        await students.findOne({
            where : {
                userAccountId : req.user.id
            }
        }).then(async (existing)=>{
            if (existing.status == 1){
                await existing.update({
                    status : false
                }).then(async ()=>{
                    await outtime.create({
                        reason : reason,
                        is_out : true,
                        studentId : existing.id
                    }).then(()=>{
                        res.json({result : "success"});
                    });
                });
            } else {
                res.json({result : "You are already out from hostel"})
            }
        });
    } else {
        await students.findOne({
            where : {
                userAccountId : req.user.id
            }
        }).then(async (existing)=>{
            if (existing.status == 1){
                res.json({result : "You are already in the hostel"})
            } else {
                await existing.update({
                    status : true
                }).then(async ()=>{
                    var currentdate = new Date(); 
                    await outtime.create({
                        reason : `Student in on ${currentdate}`,
                        is_out : false,
                        studentId : existing.id
                    }).then(()=>{
                        res.json({result : "success"});
                    });
                });
            }
        });
    }
}