require("dotenv").config();
const TOKEN_SECRET = "dsfsdfsadgdffgdhs";
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5000";
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/projet-3";
const PORT = process.env.PORT || 5000;

module.exports = { CORS_ORIGIN, TOKEN_SECRET, MONGO_URI, PORT };
