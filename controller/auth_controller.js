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

//reset Password page
module.exports.resetPasswordPage =async function(req,res){
    try{
        let forgotPass = await ForgotPasswordDB.findOne({accessToken:req.query.token,isValid:true});

        if(!forgotPass){
            console.log("invaild url");
            return res.end('<h1>Invaild Url</h1>');
        }

        // console.log(forgotPass);
        return res.render('resetpassword',{
            title:"Reset Password",
            user:forgotPass.user,
            accessToken:forgotPass.accessToken,
            url:"/admin/update-password"
        })
    }
    catch(err){
        console.log(err);
        return res.redirect('/');
    }
}

//update password
module.exports.updatePassword =async function(req,res){
    // console.log(req.body);
    try{
        let {password,confirmPassword,userID,accessToken}=req.body;
        
        //check password and confirm password match
        if(password != confirmPassword){
            console.log("password and confirm password not match");
            return res.redirect('back');
        }

        let forgotPassEntry = await ForgotPasswordDB.findOne({user:userID,accessToken:accessToken,isValid:true});

        //if entry not found then 
        if(!forgotPassEntry){
            console.log("Unathorize to update password");
            return res.redirect('/forgot-password');
        }

        //update user password 
        await AdminDB.findByIdAndUpdate(userID,{password:password});

        //update forgot password
        await forgotPassEntry.updateOne({isValid:false});
        console.log("password update successfully");
        return res.redirect('/signin');
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}