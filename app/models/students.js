const { DataTypes } = require('sequelize');
const { sequalize } = require('../../database/connection');
const faculties = require('../models/faculties');
const users = require('../models/users');
const rooms = require('../models/rooms');

const students = sequalize.define('students', {
    id : {
        type : DataTypes.INTEGER,
        allowNull : false,
        primaryKey : true,
        autoIncrement : true
    },
    full_name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    registration_number : {
        type : DataTypes.STRING,
        allowNull : false
    },
    permanant_address : {
        type : DataTypes.STRING,
        allowNull : false
    },
    temporary_address : {
        type : DataTypes.STRING
    },
    contact : {
        type : DataTypes.STRING
    },
    email : {
        type : DataTypes.STRING
    },
    guardians_name : {
        type : DataTypes.STRING
    },
    guardians_contact : {
        type : DataTypes.STRING
    },
    guardians_email : {
        type : DataTypes.STRING
    },
    total_paid : {
        type : DataTypes.FLOAT
    },
    status : {
        type : DataTypes.BOOLEAN,
        default : true
    }
});

faculties.hasOne(students, {foreignKey : 'facultyId'});
users.hasOne(students, {foreignKey : 'userAccountId'});
rooms.hasOne(students, {foreignKey : 'roomId'});
students.belongsTo(faculties, {
    foreignKey : 'facultyId',
    as : 'faculty'
});
students.belongsTo(users, {
    foreignKey : 'userAccountId',
    as : 'userAccount'
});
students.belongsTo(rooms, {
    foreignKey : 'roomId',
    as : 'room'
});

module.exports = students;