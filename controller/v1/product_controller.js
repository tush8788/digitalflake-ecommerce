const ProductDB = require('../../models/product');

// view products
module.exports.viewProduct = async function(req,res){
    try{
        let products = await ProductDB.find({});
        
        return res.status(200).json({
            message:"All products",
            products
        })
    }
    catch(err){
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}