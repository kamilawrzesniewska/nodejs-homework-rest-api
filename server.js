const mongoose = require("mongoose");
const app = require("./app");


const uriDb = process.env.DB_URI;
const PORT = process.env.PORT || 3000;

const connection = mongoose.connect(uriDb, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

connection
	.then(() => {
		app.listen(PORT, () => {
			console.log(
				`Database connection successful. Use our API on port: ${PORT}`
			);
		});
	})
	.catch((err) => {
		console.log(`Server not running. Error message: ${err.message}`);
		process.exit(1);
	});

