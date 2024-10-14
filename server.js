const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({'path' : '.env'});

const app = express();

const PORT = process.env.PORT || 8000

app.set('view engine', 'ejs');
app.use(cors());
app.use(express.static('public'))
app.use(express.json({limit : '10mb'}));
app.use('/', require('./app/routes/route'));

app.listen(PORT, ()=>{
    console.log(`server running on http://localhost:${PORT}`);
})