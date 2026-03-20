const express = require("express");
const helmet = require("helmet");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(helmet());
app.use(express.json());
app.use("/users", userRoutes);
app.use(errorHandler);

app.get("/ping", (req, res) => {
    res.status(200).json({ message: "pong" });
})

module.exports = app;