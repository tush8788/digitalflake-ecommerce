const passport = require('passport');
const localStategy = require('passport-local').Strategy;
const AdminDB = require('../models/admin');

passport.use(new localStategy({
    usernameField:'email',
    passReqToCallback:true
},async function(req,email,password,done){
    try{
        let admin = await AdminDB.findOne({email:email});

        if(!admin || admin.password != password){
            console.log("invaild email or password")
            return done(null,false);
        }

        done(null,admin);
    }
    catch(err){
        console.log(err);
        return done(err);
    }
}));

passport.serializeUser((user,done)=>{
    return done(null,user.id);
})

passport.deserializeUser(async (id,done)=>{
    try{
        let admin = await AdminDB.findById(id);
        if(!admin){
            return done(null,false);
        }

        return done(null,admin);
    }
    catch(err){
        return done(err);
    }
})

//check admin is login or not 
passport.checkAuthenticationUser = function(req,res,next){
    if(req.user){
        return next();
    }
    return res.redirect('/signin');
}

//set authenticated user in res
passport.setAuthenticatedUser = function(req,res,next){
    if(req.user){
        res.locals.user=req.user;
    }
    next();
}
