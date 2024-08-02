const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/users.controller");

router.get("/", controller.index);

router.patch("/change-status/:statusChange/:id", controller.changeStatus);

module.exports = router;