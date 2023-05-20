const CategoryDB = require('../models/category');

//category list page
module.exports.showCategoryList = async function(req,res){
    try{
        let categorise = await CategoryDB.find({});
        return res.render('products/showCategory',{
            title:"Category",
            categorise
        })
    }
    catch(err){

    }
}

// create category page
module.exports.createCategoryPage = function(req,res){
    return res.render('products/addCategory',{
        title:"Add category",
        url:'/category/create'
    })
} 

//create category
module.exports.create = async function(req,res){
    try{
        // console.log(req.body);
        let {name,discription,status} = req.body;

        let category = await CategoryDB.findOne({name:name});

        if(!category){
            category = await CategoryDB.create(req.body);
            console.log('category create successfully');
            return res.redirect('back');
        }

        console.log('category exist in DB');
        return res.redirect('back');
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

//delete category
module.exports.delete = async function(req,res){
    try{
        // console.log(req.query);
        let {id} = req.query;
        await CategoryDB.findByIdAndDelete(id);
        console.log('category delete successfully')
        return res.redirect('back');
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

//update status of category
module.exports.updateStatus = async function(req,res){
    try{
        let {id,status}=req.query;

        if(status=="Active"){
            status = "Inactive"
        }
        else{
            status = "Active"
        }

        await CategoryDB.findByIdAndUpdate(id,{status:status});
        console.log("status update successfully");
        return res.redirect('back');
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}