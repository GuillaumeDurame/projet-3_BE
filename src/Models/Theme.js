const mongoose = require("mongoose");

const themeSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
 
const Theme = new mongoose.model("Theme",themeSchema);

module.exports = Theme;