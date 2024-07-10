import express from 'express';
import {
    createAppointment,
    getAllAppointments
} from '../controllers/veterinaryController.mjs';

const router = express.Router();

router.post('/appointments', createAppointment);
router.get('/all-appointments', getAllAppointments);

export default router;
