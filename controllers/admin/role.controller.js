const Role = require("../../models/role.model");
const systemConfig = require("../../config/system");
// [GET] /admin/roles
module.exports.index = async (req, res) => {
  const records = await Role.find({
    deleted: false
  });
  res.render("admin/pages/roles/index", {
    pageTitle: "Nhóm quyền",
    records: records
  });
}

// [GET] /admin/roles/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/roles/create.pug", {
    pageTitle: "Thêm mới nhóm quyền"
  });
}

// [POST] /admin/roles/create
module.exports.createPost = async (req, res) => {
  try{
    if(res.locals.role.permissions.includes("roles_create")){
      const records = new Role(req.body);
      await records.save();
    
      res.redirect(`/${systemConfig.prefixAdmin}/roles`);
    }
  } catch(error){
    res.redirect("back");
  }

}

// [GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
  try{
    const id = req.params.id;
    const record = await Role.findOne({
      _id: id, 
      deleted: false
    })
    res.render("admin/pages/roles/edit.pug", {
      pageTitle: "Chỉnh sửa nhóm quyền",
      record: record
    })
  } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/roles`)
  }
}

// [PATCH] /admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
  try {
    if(res.locals.role.permissions.includes("roles_create")){
      const id = req.params.id;
      const data = req.body ;
      await Role.updateOne({
        _id: id,
        deleted: false
      }, data);
      req.flash("success", "Cập nhật thành công");
      res.redirect("back"); 
    }
  } catch (error) {
    req.flash("error", "Cập nhật thất bại!");
    res.redirect(`/${systemConfig.prefixAdmin}/roles`);
  }
}

// [GET /admin/roles/permissions
module.exports.permissions = async (req, res) => {
  const records = await Role.find({deleted: false});
  const permissionsMap = {
    'Danh sách sản phẩm': ['products_view', 'products_create', 'products_edit', 'products_delete'],
    'Danh mục sản phẩm': ['products-category_view', 'products-category_create', 'products-category_edit', 'products-category_delete'],
    'Nhóm quyền': ['roles_view', 'roles_create', 'roles_edit', 'roles_delete', 'roles_permissions'],
    'Tài khoản admin': ['accounts_view', 'accounts_create', 'accounts_edit', 'accounts_delete'],
    'Tài khoản user': ['users_view', 'users_create', 'users_edit', 'users_delete'],
    'Cài đặt chung': ['settings_view', 'settings_create', 'settings_edit', 'settings_delete']
  };
  res.render("admin/pages/roles/permission.pug", {
    pageTitle: "Phân quyền",
    records: records,
    permissionsMap: permissionsMap
  })
}

// [PATCH] /admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {
  if(res.locals.role.permissions.includes("roles_permissions")){
    const roles = req.body;
    for (const role of roles) {
      await Role.updateOne({
        _id: role.id,
        deleted: false
      }, {
        permissions: role.permissions
      });
    }
  
    res.json({
      code: 200,
      message: "Cập nhật thành công!"
    });
  }
}

// [GET] /admin/roles/detail/:id
module.exports.detail = async (req, res) => {
  const record = await Role.findOne({
    _id: req.params.id,
    deleted: false
  })
  res.render("admin/pages/roles/detail.pug", {
    pageTitle: "Chi tiết nhóm quyền",
    record: record
  })
}

// [PATCH] /admin/roles/delete/:id
module.exports.delete = async (req, res) => {
  if(res.locals.role.permissions.includes("roles_delete")){
    const id = req.params.id;
    await Role.updateOne({
      _id: id
    }, {
      deleted: true,
      deletedBy: res.locals.account.id,
      deletedAt: new Date()
    });
    req.flash('success', 'Xóa nhóm quyền thành công!');
    res.json({
      code: 200
    });
  } else{
    res.send(`403`);
  }
}