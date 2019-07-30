const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("logged user");
});

module.exports = router;
