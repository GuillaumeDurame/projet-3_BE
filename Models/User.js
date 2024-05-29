const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email is already used"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  description: {
    type: String,
    maxLength: 300,
  },
  favThemes: [{ type: Number, ref: "Theme" }],
});

const User = model("User", userSchema);

module.exports = User;