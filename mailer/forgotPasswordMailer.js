const nodemailer = require('../config/nodemailer');

exports.fogotPasswordLinkMail=(email,accessToken)=>{
    let htmlString = nodemailer.renderTemplete({email:email,accessToken:accessToken},'/forgotPassword.ejs')
    nodemailer.transporter.sendMail({
        from:process.env.email||'programming.tushar@gmail.com',
        to:email,
        subject:"Reset Password Link",
        html:htmlString
    },function(err,info){
        if(err){
            console.log("error inside mailer :: ",err);
            return;
        }
        console.log("mail send ",info);
    })
}