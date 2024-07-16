const dashboardRoute = require("./dashboard.route");
const productRoute = require("./product.route");
const recycleBinRoute = require("./recycleBin.route");
const productsCategoryRoute = require("./productCategory.route");
const roleRoute = require("./role.route");
const systemConfig = require("../../config/system");
module.exports.index = (app) => {

  const path = `/${systemConfig.prefixAdmin}`;

  app.use(`${path}/dashboard`, dashboardRoute);
  
  app.use(`${path}/products`, productRoute);

  app.use(`${path}/recycleBin`, recycleBinRoute);

  app.use(`${path}/products-category`, productsCategoryRoute);

  app.use(`${path}/roles`, roleRoute);
}