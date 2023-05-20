const ProductDB = require('../models/product');

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