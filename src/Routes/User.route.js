const mongoose = require("mongoose");
const { Router } = require("express");
const router = Router();

const User = require("../Models/User");

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      description: req.body.description,
      favThemes: req.body.favThemes,
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const Users = await User.find();
    res.send(Users);
  } catch (err) {
    res.send(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const UpdateRequest = await User.findByIdAndUpdate(_id, req.body);
    res.send(UpdateRequest);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const DeleteRequest = await User.findByIdAndDelete(req.params.id);
    res.send(DeleteRequest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
