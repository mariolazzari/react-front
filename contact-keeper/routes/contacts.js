const router = require("express").Router();
const User = require("../models/User");
const Contact = require("../models/Contact");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

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

module.exports = router;
