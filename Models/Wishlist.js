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
  Wish: {
    type: [String],
  },
});

const Wishlist = new mongoose.model("Wishlist", WishListSchema);
module.exports = Wishlist;
