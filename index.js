const express = require('express');
const bodyParser = require('body-parser');
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
const passport = require('passport');
const localStategy = require('./config/passport-local-stategy');
const port = process.env.port|| 8000;

const app = express();

app.set('view engine','ejs');
app.set('views','./views');

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(expressLayout);

app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static('./assets'))

app.use('/',require('./routes/index.js'));

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return;
    }

    console.log(`Server is up on port : ${port}`);
})