const ProductDB = require('../models/product');
const CategoryDB = require('../models/category');
const fs = require('fs');
const path = require('path');

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

//delete product 
module.exports.deleteProduct = async function(req,res){
    try{
        // console.log(req.query);
        let {id}=req.query;

        let product = await ProductDB.findById(id);
        
        //if product not found
        if(!product){
            console.log('product not found in DB');
            return res.redirect('back');
        }

        //delete img file
        if(product.img){
            //check given location file exist or not
            if(fs.existsSync(path.join(__dirname,'..',product.img))){
                //delete file
                fs.unlinkSync(path.join(__dirname,'..',product.img)); 
            }
        }
        //delete product
        await product.deleteOne();
        
        console.log("Product delete successfully");
        return res.redirect('back');
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}