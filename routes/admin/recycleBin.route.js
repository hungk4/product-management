const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/recycleBin.controller");

router.get("/", controller.index);
router.patch("/restore/:id", controller.restore);
router.delete("/permanentlyDelete/:id", controller.permanentlyDelete);
router.patch("/change-multi", controller.changeMulti);

module.exports = router;