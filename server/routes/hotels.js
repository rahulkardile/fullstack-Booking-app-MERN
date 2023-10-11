import express from "express";
import { countByCity, countByType, createHotel, deleteHotel, findOneHotel, getAllHotel, updateHotel } from "../controllers/hotel.js";
import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

// Create
router.post("/", verifyAdmin, createHotel);

// Update
router.put("/:id", verifyAdmin, updateHotel)

// Dalete
router.delete("/:id", verifyAdmin, deleteHotel)

// Get
router.get("/", getAllHotel)

// find one Hotel 
router.get("/find/:id", findOneHotel)

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);


export default router