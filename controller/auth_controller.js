const AdminDB = require('../models/admin');
const ForgotPasswordDB = require('../models/forgotPassword');
const crypto = require('crypto');
const EmailForgotPassword = require('../mailer/forgotPasswordMailer');

//create session
module.exports.createSession =async function(req,res){
    return res.redirect('/');
}

//forgot password link genrater [for admin]
module.exports.forgotPasswordLinkGen= async function(req,res){
    try{
        // console.log(req.body);
        let {email}=req.body;
        let admin = await AdminDB.findOne({email:email});

        if(!admin){
            console.log("email not found");
            return res.redirect('back');
        }
        
        //genrate accesstoken
        let accessToken = crypto.randomBytes(20).toString('hex');

        let entry = await ForgotPasswordDB.findOne({user:admin._id});

        if(!entry){
            entry = await ForgotPasswordDB.create({
                user:admin,
                accessToken:accessToken,
                isValid:true
            });
        }
        else if (entry.isValid==false){
            await entry.updateOne({accessToken:accessToken,isValid:true});
        }
        else{
            console.log("link already send to your mail");
            return res.redirect('/signin');
        }
        
        //send mail 
        EmailForgotPassword.fogotPasswordLinkMail(admin.email,accessToken);
        
        console.log("Mail send successfully");
        return res.redirect('/signin');
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}