const mongoose = require("mongoose");
const { Router } = require("express");
const router = Router();

const Wishlist = require("../Models/Wishlist");

router.post("/Wishlist", async  (req, res) => {
    try {
        const newWishlist = await Wishlist.create({
            name : req.body.name,
            description : req.body.description,
            invParts : req.body.invParts,
            MiniFigs : req.body.MiniFigs,
            sets : req.body.sets,
        });
        res.status(201).send(newWishlist, "Wish Added to Wishlist!");
    } catch {((err) => {
        res.status(400).send(err);
    })}
})

router.get("/Wishlist", async(req, res) => {
    try {
        const Wishes = await Wishlist.find();
        res.send(Wishes);
    } catch(err) {
        res.send(err);
    }
})

router.put("/Wishlist/:id", async(req, res) => {
    try {
        const _id = req.params.id
        const UpdateRequest = await Wishlist.findByIdAndUpdate(_id, req.body)
        res.send(UpdateRequest);
    } catch(err) {
        res.status(404).send("Couldn't update your wish");
    }
})

router.delete("/Wishlist/:id", async(req, res) => {
    try{
        console.log(req.params.id)
        const DeleteRequest = await Wishlist.findByIdAndDelete(req.params.id);
        res.send(DeleteRequest);
    } catch(err) {
        res.status(500).send("Couldn't delete your wish");
    }
})

module.exports = router;