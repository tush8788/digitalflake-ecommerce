const ProductDB = require('../models/product');
const CategoryDB = require('../models/category');

//product show
module.exports.showProduct = async function(req,res){
    try{
        let products = await ProductDB.find({});
        return res.render('products/showProduct',{
            title:"Products",
            products
        })
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

//create product page
module.exports.createProductPage = async function(req,res){
    try{
        //find all category
        let categorise = await CategoryDB.find({status:"Active"});

        return res.render('products/addProduct',{
            title:"Add Product",
            categorise
        })
    }
    catch(err){

    }
}

//create product
module.exports.createProduct = async function(req,res){
    try{
        console.log(req.body);
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}