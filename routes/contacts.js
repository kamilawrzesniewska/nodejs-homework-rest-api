router.get("/", authMiddleware, contactController.get);
router.get("/:contactId", contactController.getOne);
router.post(
	"/",
	authMiddleware,
	validate.createContact,
	contactController.post
);