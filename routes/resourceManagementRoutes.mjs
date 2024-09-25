import express from 'express';
import { addResource, getAllResources, getResourceById, updateResource } from '../controllers/resourceManagementController.mjs';

const router = express.Router();

router.post('/add', addResource);
router.get('/:id', getAllResources);
router.get('/getResourceById/:id', getResourceById)
router.put('/:id', updateResource);

export default router;
