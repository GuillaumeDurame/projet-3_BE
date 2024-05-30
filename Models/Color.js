const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  rgb: {
    type: String,
    required: true,
  },
  is_trans: {
    type: Boolean,
    required: true,
  },
});

const Color = mongoose.model("Color", colorSchema);

module.exports = Color;
