const express = require("express");
const router = express.Router();

const Set = require("../Models/Set");

router.get("/", (req, res) => {
  Set.find()
    .then((sets) => res.json(sets))
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;
