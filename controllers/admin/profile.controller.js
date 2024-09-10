const Account = require("../../models/account.model");
const Role = require("../../models/role.model");

const md5 = require("md5");

module.exports.index = async (req, res) => {
  res.render("admin/pages/profile/index.pug", {
    pageTitle: "Trang profile"
  });
}

module.exports.editPassword = async (req, res) => {
  res.render("admin/pages/profile/editPassword.pug", {
    pageTitle: "Sửa mật khẩu"
  });
}

module.exports.editPasswordPatch = async (req, res) => {
  try {
    const token = req.cookies.token;
    const account = await Account.findOne({
      token: token,
      deleted: false
    });
    const oldPassword = md5(req.body.oldPassword);
    const newPassword1 = md5(req.body.newPassword1);
    const newPassword2 = md5(req.body.newPassword2);

    if(oldPassword !== account.password){
      req.flash("error", "Mật khẩu cũ sai!");    
      res.redirect("back");
      return;
    }

    if(newPassword1 !== newPassword2){
      req.flash("error", "Nhập lại mật khẩu mới không trùng khớp!");    
      res.redirect("back");
      return;
    }

    await Account.updateOne({
      token: token,
      deleted: false
    }, {
      password: newPassword1
    });

    req.flash("success", "Đổi mật khẩu thành công!");
    res.redirect("back");    
  } catch(e){
    res.redirect("back");
  }
}