const { DataTypes } = require('sequelize');
const { sequalize } = require('../../database/connection');
const roles = require('../models/roles');

const users = sequalize.define('users', {
    id : {
        type : DataTypes.INTEGER,
        allowNull : false,
        primaryKey : true,
        autoIncrement : true
    },
    userName : {
        type : DataTypes.STRING,
        allowNull : false
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    },
    status : {
        type : DataTypes.BOOLEAN,
        allowNull : false,
        default : false
    }
});

roles.hasOne(users, { foreignKey : 'roleId' });

module.exports = users;