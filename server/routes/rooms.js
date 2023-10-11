import express from "express";
import { createRoom, updateRoom, deleteRoom, getAllRoom, findOneRoom } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router();

// create room 
router.post("/:hotelId", verifyAdmin, createRoom);

// update room 
router.put("/:id", verifyAdmin, updateRoom);

// delete room 
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom);

// get all room
router.get("/", getAllRoom)

// get one room
router.get("/:id", verifyAdmin, findOneRoom);



export default router