import FeedingRoutine from '../models/feedingRoutineModel.mjs';

// Controller functions
export const createFeedingRoutine = async (req, res) => {
    try {
        const feedingRoutine = new FeedingRoutine(req.body);
        await feedingRoutine.save();
        res.status(201).json(feedingRoutine);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getFeedingRoutines = async (req, res) => {
    try {
        const feedingRoutines = await FeedingRoutine.find().populate('livestock_id');
        res.status(200).json(feedingRoutines);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getFeedingRoutineById = async (req, res) => {
    try {
        const feedingRoutine = await FeedingRoutine.findById(req.params.id).populate('livestock_id');
        if (!feedingRoutine) {
            return res.status(404).json({ message: 'Feeding routine not found' });
        }
        res.status(200).json(feedingRoutine);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateFeedingRoutine = async (req, res) => {
    try {
        const feedingRoutine = await FeedingRoutine.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!feedingRoutine) {
            return res.status(404).json({ message: 'Feeding routine not found' });
        }
        res.status(200).json(feedingRoutine);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteFeedingRoutine = async (req, res) => {
    try {
        const feedingRoutine = await FeedingRoutine.findByIdAndDelete(req.params.id);
        if (!feedingRoutine) {
            return res.status(404).json({ message: 'Feeding routine not found' });
        }
        res.status(200).json({ message: 'Feeding routine deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
