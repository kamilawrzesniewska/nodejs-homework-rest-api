const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const indexRouter = require("./routes/api/index");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api", contactsRouter);

app.use((req, res) => {
	res.status(404).json({
		status: "error",
		code: 404,
		message: "Use api on routes: /api/contacts",
		data: "Not found",
	});
});

app.use((err, req, res, next) => {
	res.status(500).json({
		status: "fail",
		code: 500,
		message: err.message,
		data: "Internal Server Error",
	});
});

const uriDb = process.env.DB_URI;
const PORT = process.env.PORT || 3000;

const connection = mongoose.connect(uriDb, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})