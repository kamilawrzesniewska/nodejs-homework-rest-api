const express = require("express");
const router = express.Router();
const contactController = require("../../controller/index");
const validate = require("../../middlewares/contactsValidation");
const authMiddleware = require("../../middlewares/jwt");

router.get("/", authMiddleware, contactController.get);
router.get("/:contactId", contactController.getOne);
router.post(
	"/",
	authMiddleware,
	validate.createContact,
	contactController.post
);

router.delete("/:contactId", contactController.deleteContact);
router.put("/:contactId", validate.updateContact, contactController.put);
router.patch(
	"/:contactId/favorite",
	validate.updateStatusContact,
	contactController.patchFavorite
);

module.exports = router;

