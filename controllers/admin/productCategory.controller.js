const ProductCategory = require("../../models/product-category.model");
const Account = require("../../models/account.model");
const systemConfig = require("../../config/system");
const createTreeHelper = require("../../helpers/createTree.helper");
const moment = require("moment");

// [GET] /admin/products-category/
module.exports.index = async (req, res) => {
  const records = await ProductCategory.find({
    deleted: false
  });
  for(const item of records) {
    // Người tạo
    if(item.createdBy){
      const accountCreated = await Account.findOne({
        _id: item.createdBy
      })
      item.createdByFullName = accountCreated.fullName;
    } else{
      item.createdByFullName = "";
    }

    item.createdAtFormat = moment(item.createdAt).format("DD/MM/YY HH:mm:ss");

    if(item.updatedBy) {
      const accountUpdated = await Account.findOne({
        _id: item.updatedBy
      });
      item.updatedByFullName = accountUpdated.fullName;
    } else {
      item.updatedByFullName = "";
    }
    item.updatedAtFormat = moment(item.updatedAt).format("DD/MM/YY HH:mm:ss");
  }
  res.render("admin/pages/products-category/index.pug",{
    pageTitle: "Danh mục sản phẩm",
    records: records
  })
}

// [GET] /admin/products-category/create
module.exports.create = async (req, res) => {
  const categories = await ProductCategory.find({
    deleted: false
  });
  const newCategories = createTreeHelper(categories);
  res.render("admin/pages/products-category/create.pug", {
    pageTitle: "Thêm mới danh mục",
    categories: newCategories
  })
}

// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
  if(res.locals.role.permissions.includes("products-category_create")){
    if(req.body.position) {
      req.body.position = parseInt(req.body.position);
    } else{
      const countCategory = await ProductCategory.countDocuments({});
      req.body.position = countCategory + 1;
    }
    req.body.createdBy = res.locals.account.id;
    const newCategory = new ProductCategory(req.body);
    await newCategory.save();
  
    res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
  } else {
    res.send(`403`);
  }
  
}

// [GET] /admin/products-category/edit/:id
module.exports.edit = async (req, res) => {
  const id = req.params.id;
  const category = await ProductCategory.findOne({
    _id: id,
    deleted: false
  })
  const categories = await ProductCategory.find({
    deleted: false
  });
  const newCategories = createTreeHelper(categories);

  res.render("admin/pages/products-category/edit.pug", {
    pageTitle: "Chỉnh sửa danh mục sản phẩm",
    category: category,
    categories: newCategories
  });
}

// [PATCH] /admin/products-category/edit/:id
module.exports.editPatch = async (req, res) => {
  if(res.locals.role.permissions.includes("products-category_edit")){
    try{
      const id = req.params.id;
      if(req.body.position){
        req.body.position = parseInt(req.body.position);
      } else{
        const countCagegory = await ProductCategory.countDocuments({});
        req.body.position = countCagegory + 1;
      }
      req.body.updatedBy = res.locals.account.id;
      await ProductCategory.updateOne({
        _id:id,
        deleted: false
      }, req.body);
    
      req.flash("success", "Cập nhật danh mục thành công!");
      res.redirect("back");
    } catch (error){
      res.redirect("back");
    }
  } else {
    res.send(`403`);
  }
 
}

// [GET] /admin/products-category/detail/:id
module.exports.detail = async (req, res) => {
  if(res.locals.role.permissions.includes("products-category_view")){
    try{
      const id = req.params.id;
      const category = await ProductCategory.findOne({
        _id: id
      });
      
      const categories = await ProductCategory.find({
        deleted: false
      });
      const newCategories = createTreeHelper(categories);

      let categoryDad = "";
      if(category.parent_id)
        categoryDad = await ProductCategory.findOne({
          _id: category.parent_id,
          deleted: false
        });

      res.render("admin/pages/products-category/detail.pug", {
        pageTitle: "Chi tiết danh mục sản phẩm",
        category: category,
        categories: newCategories,
        categoryDad: categoryDad
      });
    } catch(error) {

    }
  } else{
    res.send(`403`);
  }
}

// [PATCH] /admin/products-category/delete/:id
module.exports.deleteItem = async (req, res) => {
  if(res.locals.role.permissions.includes("products-category_delete")){
    try {
      const id = req.params.id;
      await ProductCategory.updateOne({
        _id: id
      }, {
        deleted: true,
        deletedBy: res.locals.account.id,
        deletedAt: new Date()
      });
      req.flash('success', 'Xóa danh mục thành công!');
      res.json({
        code: 200
      });
    } catch(error){
      res.redirect("back");
    }
  } else{
    res.send(`403`);
  }

}

// [PATCH] /admin/products-category/change-status/:statusChange/:id
module.exports.changeStatus = async (req, res) => {
  try{
    if(res.locals.role.permissions.includes("products-category_edit")){
      const { id, statusChange } = req.params;
  
      await ProductCategory.updateOne({
        _id: id
      }, {
        status: statusChange
      });
    
      req.flash('success', 'cập nhật trạng thái thành công!');
      
      res.json({
        code: 200
      });
    }else{
      res.send("403");
    }
  } catch(error) {
    req.flash("error", "id sản phẩm không hợp lệ!")
}
}

// [PATCH] /admin/products-category/change-position/:id
module.exports.changePosition = async (req, res) => {
  if(res.locals.role.permissions.includes("products-category_edit")){
    try{
      const id = req.params.id;
      const position = req.body.position;
      await ProductCategory.updateOne({
        _id: id
      }, {
        position: position
      });
      req.flash("success", "Cập nhật vị trí thành công!");
      res.json({
        code: 200
      })
    } catch(error) {
      res.redirect(`/${systemConfig.prefixAdmin}/products-category`);
    }
  } else{
    res.send(`403`);
  }
};