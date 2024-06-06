const express = require("express");
const router = express.Router();
const Wishlist = require("../models/Wishlist");
const protectionMiddleware = require("../middlewares/protection.middleware");

router.use(protectionMiddleware);

router.get("/wishlist", (req, res) => {
  const { userId } = req.query;

  Wishlist.find({ userId })
    .then((wishlist) => res.json(wishlist))
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.post("/wishlist", (req, res) => {
  const { userId, set } = req.body;

  Wishlist.create({ userId, set })
    .then(() => res.json({ message: "added" }))
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.put("/wishlist", async (req, res) => {
  const { elementCollection, elementId } = req.body;
  try {
    const updatedWishlist = await Wishlist.findOneAndUpdate(
      { owner: req.user.id },
      { $push: { [elementCollection]: elementId } },
      { new: true }
    );
    res.json(updatedWishlist);
  } catch (error) {}
});

router.put("/wishlist", async (req, res) => {
  const { elementCollection, elementId } = req.body;
  try {
    const updatedWishlist = await Wishlist.findOneAndUpdate(
      { owner: req.user.id },
      { $pull: { [elementCollection]: elementId } },
      { new: true }
    );
    res.json(updatedWishlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/wishlist", (req, res) => {
  const { userId, setId } = req.body;

  Wishlist.deleteOne({ userId, "set._id": setId })
    .then(() => res.json({ message: "removed" }))
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.delete("/wishlist/all", (req, res) => {
  const { userId } = req.body;

  Wishlist.deleteMany({ userId })
    .then(() => res.json({ message: "cleared" }))
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;
