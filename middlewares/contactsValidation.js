const Joi = require("joi");

const schemaCreateContact = Joi.object({
	name: Joi.string().alphanum().min(3).max(30).required(),
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ["com", "net", "pl"] },
		})
		.required(),
	phone: Joi.string()
		.pattern(/^(\+48\s+)?\d{3}(\s*|\-)\d{3}(\s*|\-)\d{3}$/)
		.required(),
	favorite: Joi.boolean().optional(),
});

const schemaUpdateContact = Joi.object({
	name: Joi.string().alphanum().min(3).max(30).required(),
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ["com", "net", "pl"] },
		})
		.required(),
	phone: Joi.string()
		.pattern(/^(\+48\s+)?\d{3}(\s*|\-)\d{3}(\s*|\-)\d{3}$/)
		.required(),
	favorite: Joi.boolean().optional(),
});

const schemaUpdateStatusContact = Joi.object({
	favorite: Joi.boolean().required(),
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

module.exports.createContact = (req, res, next) => {
	return validate(schemaCreateContact, req.body, next, res);
};

module.exports.updateContact = (req, res, next) => {
	return validate(schemaUpdateContact, req.body, next, res);
};

module.exports.updateStatusContact = (req, res, next) => {
	return validate(schemaUpdateStatusContact, req.body, next, res);
};
