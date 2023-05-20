const express = require('express');
const bodyParser = require('body-parser');
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
const passport = require('passport');
const localStategy = require('./config/passport-local-stategy');
const MongoStore = require('connect-mongo');
const expressSession = require('express-session');
const port = process.env.port|| 8000;

const app = express();

app.set('view engine','ejs');
app.set('views','./views');

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(expressLayout);

app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static('./assets'))

app.use('/upload',express.static('./upload'))

app.use(expressSession({
    name:"session",
    secret:"anyKey@12%34",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:10000*60
    },
    store:MongoStore.create({
        mongoUrl:process.env.MONGO_URL||'mongodb://localhost/ecommerce-digitalflake',
        autoRemove:true
    },function(err){
        console.log(err || "connect");
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes/index.js'));

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return;
    }

    console.log(`Server is up on port : ${port}`);
})