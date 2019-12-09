const router = require("express").Router();
const Contact = require("../models/Contact");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

// get all contacts
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.status(200).json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error." });
  }
});

// add new contact
router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required.")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });
      const contact = await newContact.save();
      res.status(200).json(contact);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: "Server error." });
    }
  }
);

// update contact
router.put("/:id", auth, async (req, res) => {
  const { name, mail, phone, site } = req.body;

  // buil contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (mail) contactFields.mail = mail;
  if (phone) contactFields.phone = phone;
  if (site) contactFields.ste = site;

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ msg: "Contact not found." });
    }

    // check contact owner
    if (contact.user.toString() !== req.user.id) {
      return res, status(401).json({ msg: "User not authorized." });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.status(200).json({ contact });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// delete contact
router.put("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ msg: "Contact not found." });
    }

    // check contact owner
    if (contact.user.toString() !== req.user.id) {
      return res, status(401).json({ msg: "User not authorized." });
    }

    await Contact.findByIdAndDelete(req.params.id);

    res.status(200).json({ msg: "Contact deleted." });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
