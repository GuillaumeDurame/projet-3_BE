const express = require("express");
const router = express.Router();
const Wishlist = require("../models/Wishlist");
const protectionMiddleware = require("../middlewares/protection.middleware");
const MiniFig = require("../Models/Minifig");
const Set = require("../Models/Set");
const InventoryPart = require("../Models/InventoryPart");

router.use(protectionMiddleware);

router.get("/", async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ owner: req.user.id }).populate([
      { path: "sets", model: Set },
      { path: "minifigs", model: MiniFig },
      { path: "invParts", model: InventoryPart },
    ]);
    // .populate("minifigs")
    // .populate("invParts");
    res.json(wishlist);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  const { name, description } = req.body;
  try {
    const existingWishlist = await Wishlist.findOne({ owner: req.user.id });
    if (existingWishlist) {
      return res.status(400).json(err);
    }

    const newWishlist = new Wishlist({
      owner: req.user.id,
      name,
      description,
      invParts: [],
      minifigs: [],
      sets: [],
    });
//coucou
    await newWishlist.save();
    res.json({ message: "Wishlist created", wishlist: newWishlist });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/add", async (req, res) => {
  const { elementCollection, elementId } = req.body;
  try {
    const wishlist = await Wishlist.findOne({ owner: req.user.id });
    if (!wishlist) {
      return res.status(404).json();
    }

    wishlist[elementCollection].push(elementId);
    await wishlist.save();
    res.json(wishlist);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/remove", async (req, res) => {
  const { elementCollection, elementId } = req.body;
  try {
    const wishlist = await Wishlist.findOne({ owner: req.user.id });
    if (!wishlist) {
      return res.status(404).json();
    }

    wishlist[elementCollection] = wishlist[elementCollection].filter(
      (id) => id.toString() !== elementId
    );
    await wishlist.save();
    res.json();
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/all", async (req, res) => {
  try {
    await Wishlist.deleteMany({ owner: req.user.id });
    res.json();
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
