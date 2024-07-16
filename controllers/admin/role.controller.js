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
    const records = new Role(req.body);
    await records.save();

    res.redirect(`/${systemConfig.prefixAdmin}/roles`);
}