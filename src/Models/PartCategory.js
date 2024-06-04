const mongoose = require("mongoose");

const partCategorySchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const PartCategory = mongoose.model("PartCategory", partCategorySchema);

module.exports = PartCategory;
