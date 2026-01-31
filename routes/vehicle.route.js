import express from "express";
import { addDriver, addVehicles, getVehicle } from "../controllers/vehicle.controller.js";

const router = express.Router();


router.post('/add',addVehicles);
router.patch('/assign-deriver/:vehicleId',addDriver);
router.get('/:vehicleId',getVehicle);



export default router;