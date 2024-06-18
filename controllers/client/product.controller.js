const Product = require("../../models/product.model");

// [GET] /products/
module.exports.index = async (req, res) => {
    const products = await Product
        .find({
            status: "active",
            deleted: false
        })
        .sort({
            position: "desc"
        });
    
    for(const item of products){
        item.priceNew = ((1 - item.discountPercentage/100) * item.price).toFixed(0);
    }
     
    console.log(products);

    
    res.render("client/pages/products/index.pug", {
        pageTitle: "Dang sach san pham",
        products: products 
    });
}
