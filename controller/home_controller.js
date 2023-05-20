//home
module.exports.home = function(req,res){
    return res.render('home',{
        title:"home"
    })
}

//signin page
module.exports.signIn = function(req,res){
    if(req.user){
        return res.redirect('/')
    }
    return res.render('signin',{
        title:"Signin",
        url:'/admin/create-session'
    })
}

//signup page
module.exports.signUp = function(req,res){
    if(req.user){
        return res.redirect('/')
    }
    return res.render('signup',{
        title:"Signup",
        url:'/admin/create'
    })
}

//signout
module.exports.signOut = function(req,res){
    req.logout((err)=>{
        if(err){
            console.log(err);
            return;
        }
        return res.redirect('/signin');
    })
}