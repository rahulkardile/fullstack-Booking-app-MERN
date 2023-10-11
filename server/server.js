import express from "express";
import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import usersRoute from "./routes/users.js";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

dotenv.config();
const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT

const Connect = async () => {
    try {
        await mongoose.connect(MONGO_URL)
            .then(() => console.log("Database is connected"));
    } catch (error) {
        console.log(error);
    }
}

// Middlewares
app.use("/auth", authRoute)
app.use("/hotels", hotelsRoute)
app.use("/rooms", roomsRoute)
app.use("/users", usersRoute)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Error It's not you it's Us"

    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

app.listen(PORT, () => {
    Connect();
    console.log(`server is running on ${PORT}`);
})