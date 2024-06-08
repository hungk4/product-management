const dashboardRoute = require("./dashboard.route");
const productRoute = require("./product.route");
const systemConfig = require("../../config/system");
module.exports.index = (app) => {

  const path = `/${systemConfig.prefixAdmin}`;
  // app.use("/admin/dashboard", dashboardRoute);
  app.use(`${path}/dashboard`, dashboardRoute);
  
  // app.use("/admin/products", productRoute);
  app.use(`${path}/products`, productRoute);
}