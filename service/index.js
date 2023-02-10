const {
	Types: { ObjectId },
} = require("mongoose");
const Contact = require("./schemas/contact");

const getAllContacts = async (id, page, limit, favorite) => {
	if (favorite === undefined) {
		return await Contact.find({ owner: id })
			.limit(limit * 1)
			.skip((page - 1) * limit);
	}
	return await Contact.find({ owner: id, favorite })
		.limit(limit * 1)
		.skip((page - 1) * limit);
};

const getOneContact = async (contactId) => {
	let objectIdContactId;
	try {
		objectIdContactId = ObjectId(contactId);
	} catch (error) {
		return null;
	}
	return Contact.findOne({ _id: objectIdContactId }).lean();
};

const createContact = async (body, id) =>
	Contact.create({ ...body, owner: id });

const deleteContact = async (contactId) => {
	let objectIdContactId;
	try {
		objectIdContactId = ObjectId(contactId);
	} catch (error) {
		return null;
	}
	return Contact.deleteOne({ _id: objectIdContactId });
};



module.exports = {
	getAllContacts,
	getOneContact,
	createContact,
	deleteContact,
	updateContact,
};