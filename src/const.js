require("dotenv").config();

const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5000";

module.exports = {CORS_ORIGIN}