import express from "express";
import { createTrip, deleteTrip, getTrip, updateTrip } from "../controllers/trip.controller.js";

const router = express.Router();


router.post('/create',createTrip);
router.patch('/update/:tripId',updateTrip);
router.get('/:tripId',getTrip);
router.delete('/delete/:tripId',deleteTrip)



export default router;
