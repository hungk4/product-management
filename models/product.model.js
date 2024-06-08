const mongoose = require('mongoose');
const { Schema } = mongoose;

const Product = mongoose.model(
   'Product', 
    {
        title: String,
        description: String,
        price: Number,
        discountPercentage: Number,
        stock: Number,
        thumbnail: String,
        position: Number,
        deleted: Boolean,
    }, 
    "products");
    
module.exports = Product;

// Cach 2 dinh nghia 1 model

// const productSchema = new Schema({
//     title: String,
//     description: String,
//     price: Number,
//     discountPercentage: Number,
//     stock: Number,
//     thumbnail: String,
//     position: Number,
//     deleted: Boolean,
// });
// const Product = mongoose.model("Product", productSchema, "products");
