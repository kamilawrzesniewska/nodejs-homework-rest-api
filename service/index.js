const {
	Types: { ObjectId },
} = require("mongoose");
const Contact = require("./schemas/contact");

const getAllContacts = async () => Contact.find({}).lean();
const getOneContact = async (contactId) => {
	let objectIdContactId;
	try {
		objectIdContactId = ObjectId(contactId);
	} catch (error) {
		return null;
	}
	return Contact.findOne({ _id: objectIdContactId }).lean();
};

const createContact = async (body) => Contact.create(body);

const deleteContact = async (contactId) => {
	let objectIdContactId;
	try {
		objectIdContactId = ObjectId(contactId);
	} catch (error) {
		return null;
	}
	return Contact.deleteOne({ _id: objectIdContactId });
};

const updateContact = async (contactId, body) => {
	let objectIdContactId;
	try {
		objectIdContactId = ObjectId(contactId);
	} catch (error) {
		return null;
	}
	return Contact.findOneAndUpdate(
		{
			_id: objectIdContactId,
		},
		{ $set: body },
		{
			new: true,
			runValidators: true,
			strict: "throw",
		}
	);
};

module.exports = {
	getAllContacts,
	getOneContact,
	createContact,
	deleteContact,
	updateContact,
};