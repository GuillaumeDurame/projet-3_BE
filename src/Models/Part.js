const mongoose = require("mongoose");

const partSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: [true],
  },
  name: {
    type: String,
    required: true,
  },
  part_cat: {
    type: Number,
    ref: "PartCategory",
    required: true,
  },
});

const Part = mongoose.model("Part", partSchema);

module.exports = Part;
