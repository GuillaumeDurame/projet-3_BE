const mongoose = require("mongoose");
const { Router } = require("express");
const router = Router();

const protectionMiddleware = require("../middlewares/protection.middleware");
const Wishlist = require("../Models/Wishlist");

router.use(protectionMiddleware);

router.post("/", async (req, res) => {
  try {
    const newWishlist = await Wishlist.create({
      name: req.body.name,
      description: req.body.description,
      invParts: req.body.invParts,
      MiniFigs: req.body.MiniFigs,
      sets: req.body.sets,
    });
    res.status(201).json(newWishlist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const Wishes = await Wishlist.find();
    res.json(Wishes);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const UpdateRequest = await Wishlist.findByIdAndUpdate(_id, req.body);
    res.json(UpdateRequest);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const DeleteRequest = await Wishlist.findByIdAndDelete(req.params.id);
    res.json(DeleteRequest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
