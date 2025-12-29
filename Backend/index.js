require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");

// Connect DB once per cold start
connectDB();

// IMPORTANT: export app (NO listen)
module.exports = app;
