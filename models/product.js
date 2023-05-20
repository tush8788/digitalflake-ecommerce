const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    size:{
        type:String,
        required:true
    },
    mrp:{
        type:String,
        required:true
    },
    img:{
        type:String,
    },
    status:{
        type:String,
        enum:['Active','Inactive'],
        required:true
    }
},{
    timestamps:true
});

const Product = mongoose.model('Product',productSchema);

module.exports = Product;