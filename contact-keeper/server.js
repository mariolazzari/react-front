const express = require("express");
const connectDB = require("./config/db");

// mongoose
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// express middleware
app.use(express.json({ extended: false }));

// routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/users", require("./routes/users"));
app.use("/", (req, res) => {
  res.json({ msg: "COntact keeper API." });
});

app.listen(PORT, () => console.log(`Express started on port ${PORT}.`));
