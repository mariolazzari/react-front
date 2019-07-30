const router = require("express").Router();
const User = require("../models/User");

router.get("/", (req, res) => {
  res.send("get user");
});

router.post("/", (req, res) => {
  res.send("register user");
});

router.put("/:id", (req, res) => {
  res.send("update user" + req.params.id);
});

router.delete("/:id", (req, res) => {
  res.send("delete user" + req.params.id);
});

module.exports = router;
