const { DataTypes } = require("sequelize");
const { sequalize } = require('../../database/connection');

const roles = sequalize.define('user_roles', {
    id : {
        type : DataTypes.INTEGER,
        allowNull : false,
        primaryKey : true,
        autoIncrement : true
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false
    }
});



module.exports = roles;