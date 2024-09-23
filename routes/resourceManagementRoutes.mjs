import express from 'express';
import { addResource, getAllResources } from '../controllers/resourceManagementController.mjs';

const router = express.Router();

router.post('/add', addResource);
router.get('/:id', getAllResources);

export default router;
