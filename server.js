const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { migrate } = require('./database/migrations/all');
const { roles_seeder } = require('./database/seeders/roles');
const { user_seed } = require('./database/seeders/user');
const data = require('./config');

const app = express();

const PORT = data.app_port || 8000

// migrate();
// roles_seeder();
// user_seed();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(data.app_key));
app.set('view engine', 'ejs');
app.use(cors());
app.use(express.static('public'))
app.use(express.json({limit : '10mb'}));
app.use('/', require('./app/routes/web'));


app.listen(PORT, ()=>{
    console.log(`server running on http://localhost:${PORT}`);
})