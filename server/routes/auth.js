import express from "express";
import { login, register } from "../controllers/auth.js";

const router = express.Router();

// create user
router.post("/register", register)

// get user login
router.post("/login", login)

export default router