const express = require("express");
const multer  = require('multer');
const router = express.Router();

const controller = require("../../controllers/admin/accounts.controller");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const upload = multer();

router.get("/", controller.index);
router.get("/create", controller.create);
router.post(
  "/create",
  upload.single('avatar'),
  uploadCloud.uploadSingle,
  controller.createPost
);
router.get("/edit/:id", controller.edit);
router.patch("/edit/:id",
  upload.single('avatar'),
  uploadCloud.uploadSingle, 
  controller.editPatch
);
router.patch("/change-status/:statusChange/:id", controller.changeStatus);
router.get("/detail/:id", controller.detail);
router.patch("/delete/:id", controller.delete);

module.exports = router;  