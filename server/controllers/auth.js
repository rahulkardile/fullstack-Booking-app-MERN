import User from "../models/User.js";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Register User
export const register = async (req, res, next) => {

    const { username, email, password, isAdmin } = req.body
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username: username,
            email: email,
            password: hash,
        })

        await newUser.save();
        res.status(201).send("User has been created");

    } catch (error) {
        next(error);
    }
}

// User Login
export const login = async (req, res, next) => {
    const { username } = req.body;

    try {
        const loginUser = await User.findOne({ username: username })
        if (!loginUser) return next(createError(404, "User not found"));

        const isValidPassword = await bcrypt.compare(req.body.password, loginUser.password)
        if (!isValidPassword) return next(createError(400, "Wrong Password"))

        const token = jwt.sign({ id: loginUser._id, isAdmin: loginUser.isAdmin }, process.env.JWT)

        const { password, isAdmin, ...otherDetails } = loginUser._doc

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(otherDetails);


    } catch (error) {
        next(error);
    }
}