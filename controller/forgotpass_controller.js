//forgot password page
module.exports.forgotPasswordPage = function(req,res){
    return res.render('forgotpassword',{
        title:"Forgot Password",
        url:"/forgot-password/create-link"
    })
}