const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const app = express();

// Security headers
app.use(helmet());

// Enable CORS
app.use(cors());

// Parse JSON body
app.use(express.json());

// HTTP request logging
app.use(morgan("dev"));

// Health check route
app.get("/", (req, res) => {
  res.json({
    message: "API Chaos Engineering Simulator Backend is running 🚀"
  });
});

module.exports = app;
