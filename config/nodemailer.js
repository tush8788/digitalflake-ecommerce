const nodemailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs');

//configration
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // two factor auth 
    auth: {
        user: process.env.email || 'programming.tushar@gmail.com', // generated ethereal user
        pass: process.env.password || 'hmdxlfqkuugsnwiw', // generated ethereal password
    },
});

//send html
let renderTemplete = (data, relativePath) => {
    let mailHtml;
    ejs.renderFile(path.join(__dirname, '../views/mailer', relativePath),
        data, function (err, templete) {
            if (err) {
                console.log('error in rendering templete');
                return;
            }
            mailHtml = templete;
        });

    return mailHtml;
}

module.exports = {
    transporter: transporter,
    renderTemplete: renderTemplete
}