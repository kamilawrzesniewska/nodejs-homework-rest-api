const express = require("express");
const router = express.Router();
const userController = require("../../controller/auth");
const validate = require("../../middlewares/usersValidation");
const authMiddleware = require("../../middlewares/jwt");

router.post("/signup", validate.findUserByEmail, userController.register);
router.post("/login", validate.findUserByEmail, userController.login);
router.get("/logout", authMiddleware, userController.logout);
router.get("/current", authMiddleware, userController.getCurrent);
router.patch(
	"/",
	authMiddleware,
	validate.patchSubscription,
	userController.patchSubscription
);

module.exports = router;