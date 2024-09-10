const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/profile.controller");

router.get("/", controller.index);

router.get("/password/edit", controller.editPassword);

router.patch("/password/edit", controller.editPasswordPatch);

module.exports = router;