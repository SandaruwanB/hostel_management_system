const dotenv = require('dotenv');
dotenv.config({path : '.env'});

const data = {
    'db_connection' : "mysql",
    'db_port' : process.env.DB_PORT,
    'db_host' : process.env.DB_HOST,
    'db_user' : process.env.DB_USER,
    'db_user_pw' : process.env.DB_USER_PW,
    'database' : process.env.DATABASE,
    'app_key' : process.env.APP_KEY,
    'app_port' : process.env.PORT
};

module.exports = data;