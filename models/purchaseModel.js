const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    livestock_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Livestock',
        required: true
    },
    buyer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    price: {
        type: Number,
        required: true
    }
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;
