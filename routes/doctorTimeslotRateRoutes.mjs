import express from 'express';
import { createDoctorTimeslot } from '../controllers/doctorTimeslotRateController.mjs';
const router = express.Router();

router.post("/create", createDoctorTimeslot);

export default router;
