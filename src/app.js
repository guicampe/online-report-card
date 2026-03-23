const express = require("express");
const helmet = require("helmet");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(helmet());
app.use(express.json());

app.get("/ping", (req, res) => {
    res.status(200).json({ message: "pong" });
});

app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler);

module.exports = app;