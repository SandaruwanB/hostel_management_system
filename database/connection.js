const Sequelize = require('sequelize');
const data = require('../config');


module.exports.sequalize = new Sequelize(
    data.database,
    data.db_user,
    data.db_user_pw,
    {
        host : data.db_host,
        dialect : data.db_connection
    }
);