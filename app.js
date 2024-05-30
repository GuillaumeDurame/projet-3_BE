mongoose
  .connect("mongodb://127.0.0.1:27017/projet-3")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));