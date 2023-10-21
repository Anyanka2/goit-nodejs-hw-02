const express = require("express");
const contactValidation = require("../../validation/contacts.js");
const HttpError = require("../../helpers/HttpError.js");
const authenticate = require("../../middlewares/authenticate.js");
const contactsHandler = require("../../controllers/contacts.js");

const router = express.Router();

router.get("/", authenticate, async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const result = await contactsHandler.listContacts(owner, skip, limit);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await contactsHandler.getContactById(id, owner);
    if (!result) {
      return HttpError(res, 404, "Not found");
    }
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", authenticate, async (req, res, next) => {
  try {
    const { error } = contactValidation.addSchema.validate(req.body);
    if (error) {
      return HttpError(res, 400, error.message);
    }
    const { _id: owner } = req.user;
    const { name, email, phone } = req.body;
    const result = await contactsHandler.addContact(name, email, phone, owner);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await contactsHandler.removeContact(id, owner);
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

router.put("/:id", authenticate, async (req, res, next) => {
  try {
    const { error } = contactValidation.updateSchema.validate(req.body);
    if (error) {
      return HttpError(res, 400, error.message);
    }
    const { id } = req.params;
    const { _id: owner } = req.user;
    const { name, email, phone } = req.body;
    const result = await contactsHandler.updateContact(
      id,
      name,
      email,
      phone,
      owner
    );
    if (!result) {
      return HttpError(res, 404, "Not found");
    }
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});
router.patch("/:id/favorite", authenticate, async (req, res, next) => {
  try {
    const { error } = contactValidation.updateStatusSchema.validate(req.body);
    if (error) {
      return HttpError(res, 400, error.message);
    }
    const { _id: owner } = req.user;
    const { id } = req.params;
    const result = await contactsHandler.updateStatusContact(
      id,
      req.body.favorite,
      owner
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
