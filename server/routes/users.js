import express from "express";
import { deleteUser, findOneUser, getAllUser, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//     res.send("You are Authenticated");
// })

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("Your login and you can edit your account")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("Your login and you can edit all accounts")
// })

// Update user
router.put("/:id", verifyUser, updateUser);

// Delete user
router.delete("/:id", verifyUser, deleteUser);

// router get one user 
router.get("/:id", verifyUser, findOneUser);

// router get all user
router.get("/", verifyAdmin, getAllUser);


export default router