const Contact = require("../models/contact.js");

const listContacts = async (owner, skip, limit) => {
  const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name subscription");
  return result;
};

const getContactById = async (id, owner) => {
  const result = await Contact.findOne({ _id: id, owner });
  return result;
};

const removeContact = async (id, owner) => {
  const result = await Contact.findOneAndDelete({ _id: id, owner });
  return result || null;
};

const addContact = async (name, email, phone, owner) => {
  const result = await Contact.create({
    name: name,
    email: email,
    phone: phone,
    owner: owner,
  });
  return result;
};

const updateContact = async (id, name, email, phone, owner) => {
  const oldContact = await Contact.findOne({ _id: id, owner });
  if (name) {
    oldContact.name = name;
  }
  if (email) {
    oldContact.email = email;
  }
  if (phone) {
    oldContact.phone = phone;
  }
  return await oldContact.save();
};
const updateStatusContact = async (id, status, owner) => {
  const result = await Contact.findOneAndUpdate(
    { _id: id, owner },
    { favorite: status },
    { returnDocument: "after" }
  );
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
