const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/user.controller");

router.get("/register", controller.register);

router.post("/register", controller.registerPost);

router.get("/login", controller.login);

router.post("/login", controller.loginPost);

router.get("/logout", controller.logout);

router.get("/password/forgot", controller.forgotPassword);

router.post("/password/forgot", controller.forgotPasswordPost);

router.get("/password/otp", controller.otp);

router.post("/password/otp", controller.otpPost)

router.get("/password/reset", controller.resetPassword);

router.patch("/password/reset", controller.resetPasswordPatch);

router.get("/profile", controller.profile);

router.get("/password/edit", controller.edit);

router.patch("/password/edit", controller.editPatch);

module.exports = router;