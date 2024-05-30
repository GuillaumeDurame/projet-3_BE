const mongoose = require("mongoose");

const WishListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  description: {
    type: String,
    maxLength: 300,
  },
  invParts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InventoryPart",
    },
  ],
  minifigs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Minifig",
    },
  ],
  sets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Set",
    },
  ],
});

const Wishlist = new mongoose.model("Wishlist", WishListSchema);
module.exports = Wishlist;
