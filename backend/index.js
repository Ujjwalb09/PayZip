const express = require("express");
const mainRouter = require("./routes/index");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 8080;

app.use(express.json());

const corsOptions = {
  origin: "https://payzip.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.options("*", cors(corsOptions));

app.use("/api/v1", mainRouter);

app.listen(port);
