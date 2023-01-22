const express = require("express");
const router = express.Router();
const contactController = require("../controller/index");
const validate = require("../utilities/validation");

router.get("/contacts", contactController.get);

router.get("/contacts/:contactId", contactController.getOne);

router.post("/contacts", validate.createContact, contactController.post);

router.delete("/contacts/:contactId", contactController.deleteContact);

router.put(
	"/contacts/:contactId",
	validate.updateContact,
	contactController.put
);

router.patch(
	"/contacts/:contactId/favorite",
	validate.updateStatusContact,
	contactController.patchFavorite
);

module.exports = router;