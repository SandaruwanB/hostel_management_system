const { sequalize } = require('../../database/connection');
const { DataTypes } = require('sequelize');


const maintainers = sequalize.define('maintainers', {
    id : {
        type : DataTypes.INTEGER,
        allowNull : false,
        primaryKey : true,
        autoIncrement : true
    },
    callingName : {
        type : DataTypes.STRING
    },
    fullName : {
        type : DataTypes.STRING
    },
    jobRole : {
        type : DataTypes.STRING
    },
    workStartedDate : {
        type : DataTypes.STRING
    },
    workEndDate : {
        type : DataTypes.STRING
    },
    address : {
        type : DataTypes.STRING
    },
    contact : {
        type : DataTypes.STRING
    },
    emergencyContact : {
        type : DataTypes.STRING
    }
});

module.exports = maintainers;