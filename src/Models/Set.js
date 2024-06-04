const mongoose = require("mongoose");

const setSchema = new mongoose.Schema({
   name: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  num_parts: {
    type: Number,
    required: true,
  },
  imag_url: {
    type: String,
    required: true,
  },
  theme: {
    type: Number,
    ref: "Theme",
  },
});

const Set = new mongoose.model("Set", setSchema);

module.exports = Set;
