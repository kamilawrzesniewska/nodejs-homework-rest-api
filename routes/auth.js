const storage = multer.diskStorage({
	destination: "tmp/",
	filename: (req, file, cb) => cb(null, file.originalname),
	limits: { fileSize: 1048576 },
});

const mimeTypeAllowedList = [
	"image/png",
	"image/jpg",
	"image/jpeg",
	"image/gif",
];

const multerInstance = multer({
	storage,
	fileFilter: (req, file, cb) => {
		const mimetype = file.mimetype;
		if (!mimeTypeAllowedList.includes(mimetype)) {
			return cb(null, false);
		}
		return cb(null, true);
	},
});