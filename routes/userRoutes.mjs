import express from 'express';
import { registerUser, loginUser, getUsersList, updateUser } from '../controllers/userController.mjs';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:email/:role', getUsersList);
router.patch('/update', updateUser)
router.get('/profile', (req, res) => {
    res.json(req.user);
});

export default router;
