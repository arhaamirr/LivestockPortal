import express from 'express';
import { addShelterSpace, getAllShelterSpace, getShelterSpaceById, updateShelterSpace } from '../controllers/shelterSpaceController.mjs';

const router = express.Router();

router.post('/', addShelterSpace);
router.get('/all-shelters/:id', getAllShelterSpace);
router.get('/:id', getShelterSpaceById);
router.put('/:id', updateShelterSpace);
// router.delete('/:id', deleteShelter);
// router.get('/get', getSheltersListAgainstId);

export default router;
