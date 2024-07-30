const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/recycleBinCategory.controller");

router.get("/", controller.index);
router.patch("/restore/:id", controller.restore);
router.delete("/permanentlyDelete/:id", controller.permanentlyDelete);



module.exports = router;