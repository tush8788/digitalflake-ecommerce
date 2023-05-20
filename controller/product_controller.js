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
    //    console.log(req.body);
        ProductDB.uploadProductImg(req,res, async function(err){
            
            //find product already exist in DB
            let product = await ProductDB.findOne({name:req.body.name});
            
            //check file upload or not
            if(req.file){
                req.body.img=ProductDB.IMAGE_PATH+'/'+req.file.filename
            }
            
            //if product already in db then just back
            if(product){
                console.log("Product already exist in DB");
                return res.redirect('back');
            }
            product = await ProductDB.create(req.body);
        })

        console.log("Product create successfully");
        
        return res.redirect('back');
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}