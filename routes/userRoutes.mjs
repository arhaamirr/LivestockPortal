import express from 'express';
import { registerUser, loginUser, getUsersList, updateUser, updatePassword } from '../controllers/userController.mjs';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:email/:role', getUsersList);
router.patch('/update', updateUser);
router.patch('/forget-password', updatePassword);
router.get('/profile', (req, res) => {
    res.json(req.user);
});

export default router;
