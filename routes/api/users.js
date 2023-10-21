const express = require("express");
const validateBody = require("../../middlewares/validateBody.js");
const authenticate = require("../../middlewares/authenticate.js");
const ctrl = require("../../controllers/auth.js");

const authValidation = require("../../validation/auth.js");

const router = express.Router();

router.post(
  "/register",
  validateBody(authValidation.registerSchema),
  ctrl.register
);

router.post("/login", validateBody(authValidation.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
