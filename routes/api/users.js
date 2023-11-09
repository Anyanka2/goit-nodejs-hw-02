const express = require("express");
const validateBody = require("../../middlewares/validateBody.js");
const authenticate = require("../../middlewares/authenticate.js");
const upload = require("../../middlewares/upload.js");
const ctrl = require("../../controllers/auth.js");

const authValidation = require("../../validation/auth.js");

const router = express.Router();

router.post(
  "/register",
  validateBody(authValidation.registerSchema),
  ctrl.register
);
router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post("/verify", ctrl.resendVerifyEmail);

router.post("/login", validateBody(authValidation.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar);

module.exports = router;
