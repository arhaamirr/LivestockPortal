const mongoose = require('mongoose');

const livestockSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    shelter_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shelter'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Livestock = mongoose.model('Livestock', livestockSchema);

module.exports = Livestock;
