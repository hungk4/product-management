const dashboardRoute = require("./dashboard.route");
const productRoute = require("./product.route");
const recycleBinRoute = require("./recycleBin.route");
const productsCategoryRoute = require("./productCategory.route");
const roleRoute = require("./role.route");
const accountsRoute = require("./accounts.route");
const authRoute = require("./auth.route");

const systemConfig = require("../../config/system");
const authMiddleware = require("../../middlewares/admin/auth.middleware"); 

module.exports.index = (app) => {

  const path = `/${systemConfig.prefixAdmin}`;

  app.use(`${path}/dashboard`, authMiddleware.requireAuth,dashboardRoute);
  
  app.use(`${path}/products`, authMiddleware.requireAuth, productRoute);

  app.use(`${path}/recycleBin`, authMiddleware.requireAuth, recycleBinRoute);

  app.use(`${path}/products-category`, authMiddleware.requireAuth,productsCategoryRoute);

  app.use(`${path}/roles`, authMiddleware.requireAuth, roleRoute);

  app.use(`${path}/accounts`, authMiddleware.requireAuth, accountsRoute);

  app.use(`${path}/auth`, authRoute);
}