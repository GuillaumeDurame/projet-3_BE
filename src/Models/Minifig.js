const mongoose = require("mongoose");

const miniFigSchema = new mongoose.Schema({
   name: {
    type: String,
    required: true,
  },
  num_parts: {
    type: Number,
    required: true,
  },
  img_url: {
    type: String,
    required: true,
  },
});
 
const MiniFig = new mongoose.model("MiniFig",miniFigSchema);

module.exports = MiniFig;