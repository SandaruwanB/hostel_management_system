const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const { migrate } = require('./database/migrations/all');
const { roles_seeder } = require('./database/seeders/roles');
const { user_seed } = require('./database/seeders/user');
dotenv.config({'path' : '.env'});

const app = express();

const PORT = process.env.PORT || 8000

// migrate();
// roles_seeder();
// user_seed();

app.use(session({
    secret : process.env.APP_KEY,
    resave : false,
    saveUninitialized : true,
    cookie : {secure : true}
}));

app.set('view engine', 'ejs');
app.use(cors());
app.use(express.static('public'))
app.use(express.json({limit : '10mb'}));
app.use('/', require('./app/routes/web'));


app.listen(PORT, ()=>{
    console.log(`server running on http://localhost:${PORT}`);
})