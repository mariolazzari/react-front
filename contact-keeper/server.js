const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

app.use("/", (req, res) => {
  res.json({ msg: "COntact keeper API." });
});

app.listen(PORT, () => console.log(`Express started on port ${PORT}.`));
