const express = require("express");
const app = express();

app.use(express.json());


const authRoutes = require("./routes/auth.routes");
const dogRoutes = require("./routes/dog.routes");

app.use("/api/auth", authRoutes);
app.use("/api/dogs", dogRoutes);

app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

module.exports = app;
