const express = require("express");
const {
  contactValidation
} = require("../../validation/contacts.js");
const HttpError = require("../../helpers/HttpError.js");

const contactsHandler = require("../../controllers/contacts.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsHandler.listContacts();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsHandler.getContactById(id);
    if (!result) {
      return HttpError(res, 404, "Not found");
    }
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactValidation.addSchema.validate(req.body);
    if (error) {
      return HttpError(res, 400, error.message);
    }
    const { name, email, phone } = req.body;
    const result = await contactsHandler.addContact(name, email, phone);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsHandler.removeContact(id);
    if (!result) {
      return HttpError(res, 404, "Not found");
    }
    return res.status(200).json({
      message: "Contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = contactValidation.updateSchema.validate(req.body);
    if (error) {
      return HttpError(res, 400, error.message);
    }
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const result = await contactsHandler.updateContact(id, name, email, phone);
    if (!result) {
      return HttpError(res, 404, "Not found");
    }
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});
router.patch("/:id/favorite", async (req, res, next) => {
  try {
    const { error } = contactValidation.updateStatusSchema.validate(req.body);
    if (error) {
      return HttpError(res, 400, error.message);
    }
    const { id } = req.params;
    const result = await contactsHandler.updateStatusContact(
      id,
      req.body.favorite
    );
    if (!result) {
      return HttpError(res, 404, "Not found");
    }
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
