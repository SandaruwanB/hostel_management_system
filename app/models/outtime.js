const { DataTypes } = require('sequelize');
const { sequalize } = require('../../database/connection');
const students = require('../models/students');


const outtime = sequalize.define('outtime', {
    id : {
        type : DataTypes.INTEGER,
        allowNull : false,
        primaryKey : true,
        autoIncrement : true
    },
    reason : {
        type : DataTypes.STRING
    },
    time : {
        type : DataTypes.STRING
    },
    is_out : {
        type : DataTypes.BOOLEAN,
        default : false
    }
});

students.hasOne(outtime, { foreignKey : 'studentId' });
outtime.belongsTo(students, {
    foreignKey : 'studentId',
    'as' : 'student'
});

module.exports = outtime;