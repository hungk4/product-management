const Role = require("../../models/role.model");
const Account = require("../../models/account.model");
const md5 = require('md5');

const generateHelper = require("../../helpers/generate.helper");
const systemConfig = require("../../config/system");

// [GET] /admin/accounts
module.exports.index = async (req, res) => {
  const records = await Account.find({
    deleted: false
  });
  for(const record of records){
    const role = await Role.findOne({
      _id: record.role_id,
      deleted: false
    })

    record.roleTitle = role.title;
  };
  
  res.render("admin/pages/accounts/index", {
    pageTitle: "Tài khoản admin",
    records: records
  });
}

// [GET] /admin/accounts/create
module.exports.create = async (req, res) => {
  const roles = await Role.find({
    deleted: false
  }).select("title");

  res.render("admin/pages/accounts/create", {
    pageTitle: "Tạo tài khoản admin",
    roles: roles
  });
}

// [POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {
  if(res.locals.permissions.includes("accounts_create")){
    try{
      req.body.password = md5(req.body.password);

      req.body.token = generateHelper.generateRandomString(30);
    
      const account = new Account(req.body);
      await account.save();
    
      res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
    } catch(error){
      res.redirect("back");
    }
  } else {
    res.redirect("back");
  }

}

// [GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
  try{
    const id = req.params.id;
    
    const account = await Account.findOne({
      _id: id, deleted: false
    });
    const roles = await Role.find({
      deleted: false
    }).select("title");

    res.render("admin/pages/accounts/edit.pug", {
      pageTitle: "Chỉnh sửa tài khoản admin",
      roles: roles,
      account: account
  });
  } catch(error){
    res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
  }
}

// [PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
  if(res.locals.role.permissions.includes("accounts_edit")){
    try{
      const id = req.params.id;

      if(req.body.password == ""){
        delete req.body.password;
      } else {
        req.body.password = md5(req.body.password);
      }

      await Account.updateOne({
        _id: id,
        deleted: false
      }, req.body);

      req.flash("success", "Cập nhật thành công!");

      res.redirect("back");

    } catch(error){
      res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
    }
  } else{
    res.redirect("back");
  }
}

module.exports.changeStatus = async (req, res) => {
  try{
    if(res.locals.role.permissions.includes("accounts_edit")){
      const { id, statusChange } = req.params;
  
      await Account.updateOne({
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

module.exports.detail = async (req, res) => {
  if(res.locals.role.permissions.includes("accounts_view")){
    try{
      const id = req.params.id;
      const account = await Account.findOne({
        _id: id,
        deleted: false
      });
      if(account) {
        const accountRole = await Role.findOne({
          _id: account.role_id,
          deleted: false
        }).select("title");
      
        res.render("admin/pages/accounts/detail.pug", {
          pageTitle: "Chi tiết tài khoản",
          account: account,
          accountRole: accountRole
        });
      } else {
        res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
      }
    } catch(error){
      res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
    }
  } else{
    res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
  }
};

module.exports.delete = async (req, res) => {
  if(res.locals.role.permissions.includes("accounts_delete")){
    try{
      const id = req.params.id;
      await Account.deleteOne({
        _id: id
      });
  
      req.flash('success', "Đã xóa tài khoản hoàn toàn !");
  
      res.json({
        code: 200
      }); 
    } catch(error){
      res.redirect("back");
    }
  } else{
    res.redirect("back");
  }
}