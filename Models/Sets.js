const mongoose = require("mongoose");

const setsSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  numParts: {
    type: Number,
    required: true,
  },
  image: {
    type: Image,
    required: true,
  },
});

const Sets = new mongoose.model("Sets", setsSchema);

module.exports = Sets;
