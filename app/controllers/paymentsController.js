const payments = require('../models/payments');
const students = require('../models/students');

module.exports.index = async (req, res)=>{
    const paymentDetails = await payments.findAll({
        include : [
            {
                model : students,
                as : "student"
            }
        ],
        order : [
            ['id', 'DESC']
        ]
    });
    res.render('user/payments', {user : req.user, payments : paymentDetails});
}

module.exports.getCreateView = async (req, res)=>{
    const studentsDetails = await students.findAll();
    res.render('user/forms/payments', {user : req.user, students : studentsDetails});
}

module.exports.create = async (req,res)=>{
    const { paymentMethod, paymentDate, amount, payslipNumber, paymentForMonth, student } = req.body;

    await payments.findAll({
        order : [
            ['id', 'DESC']
        ],
        limit : 1
    }).then( async (payment)=>{
        const slipName = getSlipCode(payment.length > 0 ? payment[0].name : "");
            
        await payments.create({
            name : slipName,
            paymentMethod : paymentMethod,
            paymentDate : paymentDate,
            amount : amount,
            payslipNumber : payslipNumber,
            paymentForMonth : paymentForMonth,
            studentId : student ? student : null,
        }).then(async ()=>{
            await students.findOne({
                where : {
                    id : student
                }
            }).then(async (existing)=>{
                const paidAmount = existing.total_paid ? parseInt(existing.total_paid) + parseInt(amount) : amount;
                await existing.update({
                    total_paid : paidAmount
                }).then(()=>{
                    res.json({result : "success"});
                });
            });
        }).catch((err)=>{
                res.json({result : "Error happend.unable to create payment"});
        });
    });
}

module.exports.getUpdateView = async (req,res)=>{
    const reqId = req.params.id;

    const paymentDetails = await payments.findOne({
        where : {
            id : reqId
        },
        include : [
            {
                model : students,
                as : 'student'
            }
        ]
    });

    const student = await students.findOne({
        where : {
            id : paymentDetails.studentId
        }
    });

    res.render('user/forms/payments', {payment : paymentDetails, students : [student]});
}

module.exports.delete = async (req,res)=>{
    const reqId = req.params.id;

    await payments.findOne({
        where : {
            id : reqId
        }
    }).then(async (payment)=>{
        await students.findOne({
            where : {
                id : payment.studentId
            }
        }).then(async (student)=>{
            const stuValue = parseFloat(student.total_paid) - parseFloat(payment.amount);
            await student.update({
                total_paid : stuValue
            }).then(async ()=>{
                payment.destroy().then(()=>{
                    res.json({result : "success"});
                });
            });
        });
    });
}

module.exports.getStudentView = async (req,res)=>{
    res.render('student/payments', {user : req.user})
}



const getSlipCode = (lastName) => {
    const remStr = lastName.replace(/PAY/g, "");
    const value = parseInt(remStr) + 1 || 1;
    return `PAY${String(value).padStart(4, "0")}`;
};

