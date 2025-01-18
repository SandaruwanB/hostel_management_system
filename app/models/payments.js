const { DataTypes } = require('sequelize');
const { sequalize } = require('../../database/connection');
const students = require('../models/students');

const payments = sequalize.define('payments', {
    id : {
        type : DataTypes.INTEGER,
        allowNull : false,
        primaryKey : true,
        autoIncrement : true
    },
    name : {
        type : DataTypes.STRING
    },
    paymentMethod : {
        type : DataTypes.STRING
    },
    paymentDate : {
        type : DataTypes.DATEONLY,
        allowNull : false
    },
    amount : {
        type : DataTypes.FLOAT,
        allowNull : false
    },
    payslipNumber : {
        type : DataTypes.STRING
    },
    paymentForMonth : {
        type : DataTypes.STRING
    }
});

students.hasMany(payments, {foreignKey : 'studentId'});
payments.belongsTo(students, {
    foreignKey : 'studentId',
    as : 'student'
});

module.exports = payments;