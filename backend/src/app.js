const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(helmet());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-type", "Authorization"]
}));
app.use(express.json());

app.get("/ping", (req, res) => {
    res.status(200).json({ message: "pong" });
});

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);

app.use(errorHandler);

module.exports = app;