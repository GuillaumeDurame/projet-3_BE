const express = require("express");
const router = express.Router();

const Set = require("../Models/Set");

router.get("/", (req, res) => {
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);
  const skipIndex = (page - 1) * limit;
  Set.find()
    .skip(skipIndex)
    .limit(limit)
    .then((sets) => res.json(sets))
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;
