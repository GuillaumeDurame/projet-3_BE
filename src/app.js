const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const PORT = 5000;

const userRouter = require("./Routes/User.route");
const postRouter = require("./Routes/Post.route");
const wishlistRouter = require("./Routes/Wishlist.route");
const setsRouter = require("./Routes/Sets.route");
const cors = require("cors");
const { CORS_ORIGIN } = require("./const");
const InventoryPart = require("./Models/InventoryPart");

mongoose
  .connect("mongodb://127.0.0.1:27017/projet-3")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: CORS_ORIGIN,
  })
);

app.get("/", async (req, res) => {
  const InventoryParts = await InventoryPart.find().limit(10);
  console.log(InventoryParts);
  res.json(InventoryParts);
});

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/wishlist", wishlistRouter);
app.use("/sets", setsRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
