const mongoose = require("mongoose");
const { Router } = require("express");
const router = Router();

router.post("/Wishlist", (req, res) => {
    const wish = new Wishlist(req.body)
    wish.save().then( () => {
        res.status(201).send("Wish Added to Wishlist!");
    }).catch( (err) => {
        res.status(400).send(err);
    })
})

router.get("/", async(req, res) => {
    try {
        const Wishes = await Wishlist.find();
        res.send(Wishes);
    } catch(err) {
        res.send(err);
    }
})

router.patch("/UpdateWishlist/:id", async(req, res) => {
    try {
        const _id = req.params.id
        const UpdateRequest = await Wishlist.findByIdAndUpdate(_id, req.body)
        res.send(UpdateRequest);
    } catch(err) {
        res.status(404).send("Couldn't update your wish :(");
    }
})

router.delete("/DeleteWishlist/:id", async(req, res) => {
    try{
        console.log(req.params.id)
        const DeleteRequest = await Wishlist.findByIdAndDelete(req.params.id);
        res.send(DeleteRequest);
    } catch(err) {
        res.status(500).send("Couldn't delete your wish :(");
    }
})

module.exports = router;