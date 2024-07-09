import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.mjs';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', (req, res) => {
    res.json(req.user);
});

export default router;
