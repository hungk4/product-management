const User = require("../../models/user.model");

module.exports.infoUser = async (req, res, next1) => {
  if(req.cookies.tokenUser){
    const user = await User.findOne({
      tokenUser: req.cookies.tokenUser,
      deleted: false
    });

    if(user){
      res.locals.user = user;
    }
  }

  next1();
}