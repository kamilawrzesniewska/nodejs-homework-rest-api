const Joi = require("joi");

const schemafindUserByEmail = Joi.object({
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ["com", "net", "pl"] },
		})
		.required(),
	password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

const schemaPatchSubscription = Joi.object({
	subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const schemaVerifyEmail = Joi.object({
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ["com", "net", "pl"] },
		})
		.required(),
});

const validate = (schema, obj, next, res) => {
	const { error } = schema.validate(obj);
	if (error) {
		const [{ message }] = error.details;
		console.log(error);
		return res.json({
			status: "failure",
			code: 400,
			message: `Field ${message.replace(/"/g, "")}`,
		});
	}
	next();
};

module.exports.findUserByEmail = (req, res, next) => {
	return validate(schemafindUserByEmail, req.body, next, res);
};

module.exports.patchSubscription = (req, res, next) => {
	return validate(schemaPatchSubscription, req.body, next, res);
};

module.exports.verifyEmail = (req, res, next) => {
	return validate(schemaVerifyEmail, req.body, next, res);
};