

// [GET] /admin/cart
module.exports.index = async (req, res) => {
  res.render("admin/pages/cart/index.pug", {
    pageTitle: "Trang quản lý đơn hàng"
  })
}