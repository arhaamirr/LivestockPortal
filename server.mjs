import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import feedingRoutineRoutes from './routes/feedingRoutineRoutes.mjs';
import livestockRoutes from './routes/livestockRoutes.mjs';
import purchaseRoutes from './routes/purchaseRoutes.mjs';
import saleRoutes from './routes/saleRoutes.mjs';
import shelterRoutes from './routes/shelterRoutes.mjs';
import userRoutes from './routes/userRoutes.mjs';
import authMiddleware from './middleware/authMiddleware.mjs';
import housingRequirementRoutes from './routes/housingRequirementRoutes.mjs'; 

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
});

app.use(express.json());
app.use('/users', authMiddleware);
app.use('/feeding-routines', feedingRoutineRoutes);
app.use('/livestock', livestockRoutes);
app.use('/purchases', purchaseRoutes);
app.use('/sales', saleRoutes);
app.use('/shelters', shelterRoutes);
app.use('/users', userRoutes);
app.use('/housing-requirements', housingRequirementRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
