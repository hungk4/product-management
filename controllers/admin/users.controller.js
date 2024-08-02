const User = require("../../models/user.model");


// [GET] /admin/users
module.exports.index = async (req, res) => {
  const records = await User.find({
    deleted: false
  });
  res.render("admin/pages/users/index.pug", {
    pageTitle: "Quản lý tài khoản user",
    records: records
  })
}

// [PATCH] /admin/users/change-status/:statusChange/:id
module.exports.changeStatus = async (req, res) => {
  try{
    if(res.locals.role.permissions.includes("users_edit")){
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

// [GET] /admin/users/detail/:id
module.exports.detail = async (req, res) => {
  try{
    if(res.locals.role.permissions.includes("users_view")){
      const user = await User.findOne({
        _id: req.params.id,
        deleted: false
      });
      
      res.render("admin/pages/users/detail.pug", {
        pageTitle: "Chi tiết tài khoản user",
        user: user
      });
    }
  } catch(error){
    res.redirect("back");
  }
}

// [DELETE] /admin/users/delete/:id
module.exports.delete = async (req, res) => {
  if(res.locals.role.permissions.includes("users_delete")){
    try{
      const id = req.params.id;
      await User.updateOne({
        _id: id
      }, {
        deleted: true,
        deletedBy: res.locals.account.id,
        deletedAt: new Date()
      });
      req.flash('success', 'Xóa sản phẩm thành công!');
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