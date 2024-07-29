const Account = require("../../models/account.model");
const md5 = require("md5")
const systemConfig = require("../../config/system");

// [GET] /admin/auth/login
module.exports.login = async (req, res) => {
  res.render("admin/pages/auth/login.pug", {
    pageTitle: "Đăng nhập"
  })
}

// [POST] /admin/auth/login
module.exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const account = await Account.findOne({
    email: email,
    deleted: false
  });

  if(!account){
    req.flash("error", "Email không tồn tại trong hệ thống");
    res.redirect("back");
    return;
  }
  if(md5(password) != account.password){
    req.flash("error", "mật khẩu sai");
    res.redirect("back");
    return;
  }
  if(account.status != "active"){
    req.flash("error", "Tài khoản đang bị khóa");
    res.redirect("back");
    return;
  }
  const expiresIn = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // Cookie expires in 30 days
  res.cookie("token", account.token, { expires: expiresIn });
  res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
}

// [GET] /admin/auth/logout
module.exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.redirect(`/${systemConfig.prefixAdmin}/auth/login`);
}