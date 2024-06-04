const mongoose = require("mongoose");

const inventoryPartSchema = new mongoose.Schema({
  color: {
    type: Number,
    ref: "Color",
    required: [true],
  },
  img_url: {
    type: String,
  },
  is_spare: {
    type: Boolean,
    required: true,
  },
  part: {
    type: String,
    ref: "Part",
    required: true,
  },
});

const InventoryPart = mongoose.model("InventoryPart", inventoryPartSchema);

module.exports = InventoryPart;