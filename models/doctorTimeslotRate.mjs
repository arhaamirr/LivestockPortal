import mongoose from 'mongoose';

const doctorTimeslotRateSchema = new mongoose.Schema({
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    start_time: {
        type: Date,
        required: true
    },
    end_time: {
        type: Date,
        required: true
    },
   rate: {
        type: Number,
        required: true
   }
});

const FeedingRoutine = mongoose.model('doctorTimeslotRate', doctorTimeslotRateSchema);

export default FeedingRoutine;
