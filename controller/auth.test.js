const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");


beforeAll(async () => {
	await mongoose.connect(DB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
});

describe("test login", () => {
	test("test login route", async () => {
		const credentials = {
			email: "btmq009@gmail.com",
			password: "batman123",
		};
		const response = await request(app)
			.post("/api/users/login")
			.send(credentials);

		expect(response.statusCode).toBe(200);
		expect(response.body.token).toBeTruthy();
		expect(typeof response.body.user).toBe("object");
		expect(typeof response.body.user.email).toBe("string");
		expect(typeof response.body.user.subscription).toBe("string");
	});
});