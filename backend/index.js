const express = require("express");
const mainRouter = require("./routes/index");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use(
  cors({
    origin: "https://payzip.vercel.app", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Define allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Define allowed headers
    credentials: true, // Enable this if requests include credentials like cookies
  })
);

app.use("/api/v1", mainRouter);

app.listen(port);
