import express from 'express';
import { addResource } from '../controllers/resourceManagementController.mjs';

const router = express.Router();

router.post('/add', addResource);

export default router;
