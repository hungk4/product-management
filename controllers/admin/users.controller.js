const User = require("../../models/user.model");

module.exports.index = async (req, res) => {
  const records = await User.find({});
  res.render("admin/pages/users/index.pug", {
    pageTitle: "Quản lý tài khoản user",
    records: records
  })
}