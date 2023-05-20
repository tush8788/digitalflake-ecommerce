const AdminDB = require('../models/admin');

//create admin [for future use]
module.exports.createAdmin =async function(req,res){
    try{
        let {email,password,confirmPassword} = req.body;
        
        //password and confirm password match
        if(password != confirmPassword){
            console.log('password and confirm password not match');
            return res.redirect('back');
        }

        let admin = await AdminDB.find({});

        //check any entry already created in db then just back
        if(admin.length>0){
            console.log('Admin already exist');
            return res.redirect('/signin');
        }

        //create new admin
        admin = await AdminDB.create(req.body);
        console.log("Admin create successfully");
        return res.redirect('/signin');

    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

