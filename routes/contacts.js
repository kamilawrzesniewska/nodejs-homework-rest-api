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
