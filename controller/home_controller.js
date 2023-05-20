//home
module.exports.home = function(req,res){
    return res.render('home',{
        title:"home"
    })
}

//signin
module.exports.signIn = function(req,res){
    return res.render('signin',{
        title:"Signin",
        url:'/admin/create-session'
    })
}

//signup 
module.exports.signUp = function(req,res){
    return res.render('signup',{
        title:"Signup",
        url:'/admin/create'
    })
}