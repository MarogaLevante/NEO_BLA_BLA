const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nombre: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" }
});

module.exports = mongoose.model("User", userSchema);