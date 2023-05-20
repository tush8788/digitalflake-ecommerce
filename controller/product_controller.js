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
        req.flash('error',"Internal server error")
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
        req.flash('error',"Internal server error")
        console.log(err);
        return res.redirect('back');
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
                req.flash('error',"Product already exist in DB")
                return res.redirect('back');
            }
            product = await ProductDB.create(req.body);
        })

        req.flash('success',"Product create successfully")
        // console.log("Product create successfully");
        return res.redirect('back');
    }
    catch(err){
        console.log(err);
        req.flash('error',"Internal server error")
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
            req.flash('error',"product not found in DB")
            // console.log('product not found in DB');
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
        req.flash('success',"Product delete successfully")
        // console.log("Product delete successfully");
        return res.redirect('back');
    }
    catch(err){
        console.log(err);
        req.flash('error',"Internal server error")
        return res.redirect('back');
    }
}

//update product
module.exports.updateProductStaus = async function(req,res){
    try{
        // console.log(req.query);
        let {id,status}=req.query;

        if(status=="Active"){
            status="Inactive";
        }
        else{
            status="Active";
        }

        await ProductDB.findByIdAndUpdate(id,{status:status});
        req.flash('success',"Product status update")
        // console.log('Product status update');
        return res.redirect('back');
    }
    catch(err){
        console.log(err);
        req.flash('error',"Internal server error")
        return res.redirect('back');
    }
}