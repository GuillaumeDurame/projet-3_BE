const mongoose = require("mongoose");
const { Router } = require("express");
const router = Router();
const { TOKEN_SECRET } = require("../const");
const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const protectionMiddleware = require("../middlewares/protection.middleware");

router.post("/signup", async (req, res) => {
  const { username, email, password, description, favThemes } = req.body;
  
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      description,
      favThemes,
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    const isCorrectCredentials =
      user != null && (await bcrypt.compare(password, user.password));

    if (!isCorrectCredentials) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const authToken = jwt.sign({ email }, TOKEN_SECRET, {
      algorithm: "HS256",
      issuer: "P3",
      expiresIn: "7d",
    });

    res.json({ authToken });
  } catch (err) {
    next(err);
  }
});

router.use(protectionMiddleware);

router.get("/me", async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.send(err);
  }
});

router.put("/me", async (req, res) => {
  try {
    const _id = req.user.id;
    const UpdateRequest = await User.findByIdAndUpdate(_id, req.body);
    res.send(UpdateRequest);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.delete("/me", async (req, res) => {
  try {
    console.log(req.user.id);
    const DeleteRequest = await User.findByIdAndDelete(req.user.id);
    res.send(DeleteRequest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
