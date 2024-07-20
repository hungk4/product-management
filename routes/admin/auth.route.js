const express = require("express");
const multer  = require('multer');
const router = express.Router();

const controller = require("../../controllers/admin/auth.controller.js");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const upload = multer();

router.get("/login", controller.login);
router.post("/login", controller.loginPost);

module.exports = router;  