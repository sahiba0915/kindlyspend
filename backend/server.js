require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require('./config/db');
const app = express();
app.use(express.json());
const authRoutes = require("./routes/authRoutes");

app.use(
    cors(
        {
            origin: process.env.CLIENT_URL || "*",
            methods: ["GET", "POST", "PUT", "DELETE"],
            allowedHeaders: ["Content-Type", "Authorization"],
        }
    )
)

connectDB()

app.use("/api/v1/auth", authRoutes);
app.use("/uploads",express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))