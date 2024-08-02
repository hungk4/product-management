const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/users.controller");

router.get("/", controller.index);

router.patch("/change-status/:statusChange/:id", controller.changeStatus);

router.get("/detail/:id", controller.detail);

router.patch("/delete/:id", controller.delete);

module.exports = router;