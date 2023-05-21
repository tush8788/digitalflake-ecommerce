const AdminDB = require('../models/admin');
const ForgotPasswordDB = require('../models/forgotPassword');
const crypto = require('crypto');
const EmailForgotPassword = require('../mailer/forgotPasswordMailer');
const bcrypt = require('bcrypt');
const { resolve } = require('path');

//create session
module.exports.createSession =async function(req,res){
    req.flash('success','Signin successfully');
    return res.redirect('/');
}

//forgot password link genrater [for admin]
module.exports.forgotPasswordLinkGen= async function(req,res){
    try{
        // console.log(req.body);
        let {email}=req.body;
        let admin = await AdminDB.findOne({email:email});

        if(!admin){
            req.flash('error','Email not found');
            // console.log("email not found");
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
            req.flash('error','link already send to your mail');
            // console.log("link already send to your mail");
            return res.redirect('/signin');
        }
        
        // let promise = new Promise(async(resolve,reject)=>{
        //     try{
        //         // let info = await EmailForgotPassword.fogotPasswordLinkMail(admin.email,accessToken);
        //         // console.log(info);
        //         // if(info.messageId){
        //         //     resolve();
        //         // }
        //         // else{
        //         //     reject();
        //         // }
        //         return EmailForgotPassword.fogotPasswordLinkMail(admin.email,accessToken);
                                 
        //     }
        //     catch(err){
        //         console.log(err);
        //         reject();
        //     }
        //     // console.log(info);
        //     // if(info.messageId){
        //     //     resolve();
        //     // }
        //     // else{
        //     //     reject();
        //     // }
        // })

        // promise.then(()=>{
        //     req.flash('success','Mail send successfully');
        //     return res.redirect('/signin');
        // }).catch( async()=>{
        //     req.flash('error','Error in sending mail Try agin');
        //     await entry.updateOne({isValid:false}); 
        //     return res.redirect('/signin');
        // })
        //send mail 
        
        req.flash('success','Mail send successfully');
        // console.log("Mail send successfully");
        return res.redirect('/signin');
    }
    catch(err){
        console.log(err);
        req.flash('error','Internal server error');
        return res.redirect('back');
    }
}

//reset Password page
module.exports.resetPasswordPage =async function(req,res){
    try{
        let forgotPass = await ForgotPasswordDB.findOne({accessToken:req.query.token,isValid:true});

        if(!forgotPass){
            req.flash('error','Invaild Url');
            return res.end('<h1>Invaild Url</h1>');
        }

        // console.log(forgotPass);
        return res.render('resetpassword',{
            title:"Reset Password",
            user:forgotPass.user,
            accessToken:forgotPass.accessToken,
            url:"/admin/update-password",
            user:null // this send becouse page show add product and add category and signout
        })
    }
    catch(err){
        console.log(err);
        req.flash('error','Internal server error');
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
            req.flash('error','password and confirm password not match');
            console.log("password and confirm password not match");
            return res.redirect('back');
        }

        let forgotPassEntry = await ForgotPasswordDB.findOne({user:userID,accessToken:accessToken,isValid:true});

        //if entry not found then 
        if(!forgotPassEntry){
            req.flash('error','Unathorize to update password');
            // console.log("Unathorize to update password");
            return res.redirect('/forgot-password');
        }

        // encript password
        password = await bcrypt.hash(password,10);

        //update user password 
        await AdminDB.findByIdAndUpdate(userID,{password:password});

        //update forgot password
        await forgotPassEntry.updateOne({isValid:false});
        req.flash('success','password update successfully');
        // console.log("password update successfully");
        return res.redirect('/signin');
    }
    catch(err){
        console.log(err);
        req.flash('error','Internal server error');
        return res.redirect('back');
    }
}