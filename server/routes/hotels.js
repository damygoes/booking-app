import express from "express";
import {
  createHotel,
  deleteHotel,
  getAllHotels,
  getHotel,
  updateHotel,
} from "../controllers/hotelcontroller.js";
import Hotel from "../models/Hotel.js";

const router = express.Router();

// CREATE
router.post("/", createHotel);
// UPDATE
router.put("/:id", updateHotel);
// DELETE
router.delete("/:id", deleteHotel);
// GET A SPECIFIC HOTEL
router.get("/:id", getHotel);
// GET ALL HOTELS
router.get("/", getAllHotels);

export default router;
