const mongoose = require("mongoose");
const { Router } = require("express");
const router = Router();

const Post = require("../Models/Post");

router.post("/", async (req, res,) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
    });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const userPost = await Post.find();
    res.json(userPost);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const UpdateRequest = await Post.findByIdAndUpdate(_id, req.body);
    res.json(UpdateRequest);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const DeleteRequest = await Post.findByIdAndDelete(req.params.id);
    res.json(DeleteRequest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
