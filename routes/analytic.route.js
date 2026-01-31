import express from "express";
import { getanalytic } from "../controllers/analytics.controller.js";

const router = express.Router();


router.get('/',getanalytic)



export default router;
