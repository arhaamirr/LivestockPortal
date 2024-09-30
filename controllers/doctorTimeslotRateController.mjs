import DoctorTimeslotRate from '../models/doctorTimeslotRate.mjs';

export const createDoctorTimeslot = async (req, res) => {
    const { doctor_id, start_time, end_time, rate } = req.body;

    try {
        // Validate required fields
        if (!doctor_id || !start_time || !end_time || rate === undefined) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if start_time is before end_time
        if (new Date(start_time) >= new Date(end_time)) {
            return res.status(400).json({ message: 'Start time must be before end time' });
        }

        // Check for overlapping time slots
        const existingTimeslot = await DoctorTimeslotRate.findOne({
            doctor_id,
            $or: [
                {
                    start_time: { $lt: new Date(end_time) }, 
                    end_time: { $gt: new Date(start_time) } 
                }
            ]
        });

        if (existingTimeslot) {
            // Allow partial overlap but not full overlap
            const newStartTime = new Date(start_time);
            const newEndTime = new Date(end_time);
            const existingStartTime = existingTimeslot.start_time;
            const existingEndTime = existingTimeslot.end_time;

            // Check if new slot is fully contained within the existing slot
            if (
                (newStartTime >= existingStartTime && newEndTime <= existingEndTime) || // Fully inside
                (newStartTime <= existingStartTime && newEndTime >= existingEndTime) || // Fully overlaps
                (newStartTime <= existingStartTime && newEndTime <= existingEndTime) || // Starts before and ends inside
                (newStartTime >= existingStartTime && newEndTime >= existingEndTime) // Starts inside and ends after
            ) {
                return res.status(400).json({ message: 'Timeslot overlaps with an existing timeslot' });
            }
        }

        // Create new timeslot and rate
        const newTimeslot = new DoctorTimeslotRate({
            doctor_id,
            start_time,
            end_time,
            rate
        });

        await newTimeslot.save();
        res.status(201).json({ message: 'Doctor timeslot created successfully', data: newTimeslot });
    } catch (error) {
        console.error('Error creating doctor timeslot:', error);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};
