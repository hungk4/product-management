const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system");
// [GET] /admin/products-category/
module.exports.index = async (req, res) => {
  const records = await ProductCategory.find({
    deleted: false
  }) 
  res.render("admin/pages/products-category/index.pug",{
    pageTitle: "Danh mục sản phẩm",
    records: records
  })
}

// [GET] /admin/products-category/create
module.exports.create = (req, res) => {
  res.render("admin/pages/products-category/create.pug", {
    pageTitle: "Thêm mới danh mục"
  })
}

// [POST] /admin/products-category/crete
module.exports.createPost = async (req, res) => {
  if(req.body.position) {
    req.body.position = parseInt(req.body.position);
  } else{
    const countCategory = await ProductCategory.countDocuments({});
    req.body.position = countCategory + 1;
  }
  const newCategory = new ProductCategory(req.body);
  await newCategory.save();

  res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
}