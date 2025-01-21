const { DataTypes } = require('sequelize');
const { sequalize } = require('../../database/connection');

const rooms = sequalize.define('rooms', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        allowNull : false,
        autoIncrement : true
    },
    room_number : {
        type : DataTypes.STRING
    },
    beds_count : {
        type : DataTypes.INTEGER
    }
});

module.exports = rooms;
