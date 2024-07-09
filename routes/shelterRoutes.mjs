import express from 'express';
import { createShelter, getAllShelters, getShelterById, updateShelter, deleteShelter } from '../controllers/shelterController.mjs';

const router = express.Router();

router.post('/', createShelter);
router.get('/', getAllShelters);
router.get('/:id', getShelterById);
router.put('/:id', updateShelter);
router.delete('/:id', deleteShelter);

export default router;
