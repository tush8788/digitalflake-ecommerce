
//category list page
module.exports.showCategoryList = async function(req,res){
    return res.render('products/showCategory',{
        title:"Category"
    })
}

// create category page
module.exports.createCategoryPage = function(req,res){
    return res.render('products/addCategory',{
        title:"Add category",
        url:'/category/create'
    })
} 