const { DataTypes } = require('sequelize');
const { sequalize } = require('../../database/connection');
const users = require('../models/users');

const complaints = sequalize.define('complaints', {
    id : {
        type : DataTypes.INTEGER,
        allowNull : false,
        primaryKey : true,
        autoIncrement : true
    },
    subject : {
        type : DataTypes.STRING,
        allowNull : false
    },
    message : {
        type : DataTypes.TEXT,
        allowNull : false,
    },
    staus : {
        type : DataTypes.BOOLEAN,
        default : false
    }
})

users.hasMany(complaints, {foreignKey : 'userId'});
complaints.belongsTo(users, {
    foreignKey : 'userId',
    as : 'user',
});

module.exports = complaints;