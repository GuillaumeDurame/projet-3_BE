const express = require("express");
const mongoose = require("mongoose");
const PORT = 5000;

const userRouter = require("./Routes/User.route");
const postRouter = require("./Routes/Post.route");
const wishlistRouter = require("./Routes/Wishlist.route");

mongoose
  .connect("mongodb://127.0.0.1:27017/projet-3")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: CORS_ORIGIN
  })
);

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/wishlists", wishlistRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
