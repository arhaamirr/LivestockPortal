import mongoose from 'mongoose';

const UserPurchaseSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    shelterspace_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ShelterSpace',
        required: true
    }
});

const UserPurchase = mongoose.model('purchases', UserPurchaseSchema);

export default UserPurchase;