const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const mockRoutes = require("./routes/mock.routes");
const serveMockRoutes = require("./routes/serveMock.routes");
const analyticsRoutes = require("./routes/analytics.routes");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(helmet());

const allowedOrigins = [
  "https://frostfault-api-chaos-simulator.vercel.app",
  "http://localhost:5173"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true
  })
);

// 🔑 REQUIRED FOR BROWSERS
app.options("*", cors());

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/mock", mockRoutes);
app.use("/mock", serveMockRoutes);
app.use("/api/analytics", analyticsRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API Chaos Engineering Simulator Backend is running 🚀" });
});

app.use(errorHandler);

module.exports = app;
