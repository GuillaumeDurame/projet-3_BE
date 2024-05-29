const mongoose = require("mongoose");

const miniFigsSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
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
 
const MiniFigs = new mongoose.model("MiniFigs",miniFigsSchema);

module.exports = MiniFigs;