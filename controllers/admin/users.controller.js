const User = require("../../models/user.model");


// [GET] /admin/users
module.exports.index = async (req, res) => {
  const records = await User.find({});
  res.render("admin/pages/users/index.pug", {
    pageTitle: "Quản lý tài khoản user",
    records: records
  })
}

// [PATCH] /admin/users/change-status/:statusChange/:id
module.exports.changeStatus = async (req, res) => {
  try{
    if(res.locals.role.permissions.includes("products_edit")){
      const { id, statusChange } = req.params;
  
      await User.updateOne({
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