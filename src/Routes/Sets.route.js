const express = require("express");
const router = express.Router();

const Set = require("../Models/Set");

router.get("/", async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 100;
  const skipIndex = (page - 1) * limit;
  try {
    const sets = await Set.find().skip(skipIndex).limit(limit);
    const totalSets = await Set.countDocuments();
    res.json({sets,totalSets})
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
