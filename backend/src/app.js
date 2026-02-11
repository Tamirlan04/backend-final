const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const orderRoutes = require("./routes/orders.routes");

const app = express();

const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");

app.use(cors({
  origin: "http://127.0.0.1:5500"
}));

app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
