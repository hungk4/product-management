const ProductCategory = require("../../models/product-category.model");
const systemConfig = require("../../config/system");

module.exports.index = async (req, res) => {
  const records = await ProductCategory.find({
    deleted: true
  }) 
  res.render("admin/pages/recycleBinCategory/index.pug", {
    pageTitle: "Thùng rác danh mục",
    records: records
  })
}

module.exports.restore = async (req, res) => {
  const id = req.params.id;
  await ProductCategory.updateOne({
    _id: id
  }, {
    deleted: false
  });

  req.flash('success', "Đã khôi phục danh mục");

  res.json({
    code: 200
  });
}

// [DELETE] /admin/recyleBin/permanentlyDelete/:id
module.exports.permanentlyDelete = async (req, res) => {
  const id = req.params.id;
  await ProductCategory.deleteOne({
    _id: id
  });

  req.flash('success', "Đã xóa danh mục hoàn toàn");

  res.json({
    code: 200
  });
}
