const sgMail = require("@sendgrid/mail");
const Mailgen = require("mailgen");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const mailGenerator = new Mailgen({
	theme: "default",
	product: {
		name: "Contacts App",
		link: "http://localhost:8000/api/users/login",
	},
});

const emailBody = (email, verificationToken) => {
	return {
		body: {
			name: `${email}`,
			intro:
				"You have received this email because you need to verify your account.",
			action: {
				instructions: "Click the button below to verify your email:",
				button: {
					color: "#454545",
                    text: "Verify your email",
					link: `http://localhost:8000/api/users/verify/${verificationToken}`,
				},
			},
		},
	};
};

const emailConfig = (email, verificationToken) => {
	const body = mailGenerator.generate(emailBody(email, verificationToken));
	return {
		to: { email },
		from: "kamka@gmail.com",
        subject: "Contacts App - Email verification",
		html: body,
	};
};

const sendEmail = (email, verificationToken) => {
	sgMail
		.send(emailConfig(email, verificationToken))
		.then((res) => {
			console.log(res);
		})
		.catch((error) => {
			console.error(error);
		});
};

module.exports = { sendEmail };