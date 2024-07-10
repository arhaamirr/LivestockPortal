import Shelter from '../models/shelterModel.mjs';

export const createShelter = async (req, res) => {
    try {
        const shelter = new Shelter(req.body);
        await shelter.save();
        res.status(201).json(shelter);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAllShelters = async (req, res) => {
    try {
        const shelters = await Shelter.find().populate('user_id');
        res.status(200).json(shelters);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getShelterById = async (req, res) => {
    try {
        const shelter = await Shelter.findById(req.params.id).populate('user_id');
        if (!shelter) {
            return res.status(404).json({ message: 'Shelter not found' });
        }
        res.status(200).json(shelter);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateShelter = async (req, res) => {
    try {
        const shelter = await Shelter.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!shelter) {
            return res.status(404).json({ message: 'Shelter not found' });
        }
        res.status(200).json(shelter);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteShelter = async (req, res) => {
    try {
        const shelter = await Shelter.findByIdAndDelete(req.params.id);
        if (!shelter) {
            return res.status(404).json({ message: 'Shelter not found' });
        }
        res.status(200).json({ message: 'Shelter deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
