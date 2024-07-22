const Account = require("../../models/account.model");
const Role = require("../../models/role.model");
module.exports.index = async (req, res) => {
  res.render("admin/pages/profile/index.pug", {
  });
}