const { DataTypes } = require('sequelize');
const { sequalize } = require('../../database/connection');


const faculties = sequalize.define('faculties', {
    id : {
        type : DataTypes.INTEGER,
        allowNull : false,
        primaryKey : true,
        autoIncrement : true
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    location : {
        type : DataTypes.STRING
    },
    hod_name : {
        type : DataTypes.STRING
    },
    hod_cantact : {
        type : DataTypes.STRING
    },
    hod_address : {
        type : DataTypes.STRING
    }
});


module.exports = faculties;