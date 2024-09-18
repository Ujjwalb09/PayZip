const express = require("express");
const mainRouter = require("./routes/index");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use("/api/v1", mainRouter);

app.listen(port);
