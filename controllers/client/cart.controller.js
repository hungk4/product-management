const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");

// [GET] /cart
module.exports.index = async (req, res) => {
  const cartId = req.cookies.cartId;

  const cart = await Cart.findOne({
    _id: cartId
  });

  cart.totalPrice = 0;

  if(cart.products.length > 0) {
    for (const product of cart.products) {
      const productInfo = await Product.findOne({
        _id: product.productId
      }).select("title thumbnail slug price discountPercentage");
      productInfo.priceNew = (1 - productInfo.discountPercentage/100) * productInfo.price;
      product.productInfo = productInfo;
      product.totalPrice = productInfo.priceNew * product.quantity;
      cart.totalPrice += product.totalPrice;
    }
  }

  res.render("client/pages/cart/index",{
    pageTitle: "Giỏ hàng",
    cartDetail: cart
  });
}

// [POST] /cart/add/:productId
module.exports.addPost = async (req, res) => {
  const cartId = req.cookies.cartId;
  const productId = req.params.productId;
  const quantity = parseInt(req.body.quantity);

  const cart = await Cart.findOne({
    _id: cartId
  });

  const existProductInCart = cart.products.find(
    item => item.productId == productId
  );

  if(existProductInCart) {
    await Cart.updateOne({
      _id: cartId,
      'products.productId': productId
    }, {
      $set: {
        'products.$.quantity': quantity + existProductInCart.quantity
      }
    });
  } else {
    await Cart.updateOne({
      _id: cartId
    }, {
      $push: {
        products: {
          productId: productId,
          quantity: quantity
        }
      }
    });
  }
  req.flash("success", "Đặt hàng thành công!");
  res.redirect("back");
}

// [GET] /cart/delete/:productId
module.exports.delete = async (req, res) => {
  const productId = req.params.productId;
  const cartId = req.cookies.cartId;

  // $pull để xóa đi 1 phẩn tử của mảng trong 1 object

  await Cart.updateOne({
    _id: cartId
  }, {
    $pull: {
      products: {
        productId: productId
      }
    }
  })

  req.flash("error", "Xóa sản phẩm thành công!");

  res.redirect("back");
}

// [GET] /cart/update/:productId/:quantity
module.exports.update = async (req, res) => {
  try{
    const cartId = req.cookies.cartId;
    const productId = req.params.productId;
    const quantity = parseInt(req.params.quantity);
  
    await Cart.updateOne({
      _id: cartId,
      'products.productId': productId
    }, {
      $set: {
        'products.$.quantity': quantity
      }
    })
    req.flash("success", "Cập nhật số lượng thành công!");
  } catch (error) {
    req.flash("error", "id sai !");
  }
  res.redirect("back");

}