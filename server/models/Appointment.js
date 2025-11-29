import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    scheduledAt: { type: Date, required: true },
    status: { type: String, enum: ['SCHEDULED','COMPLETED','CANCELLED'], default: 'SCHEDULED'},
     createdAt: { type: Date, default: Date.now }
})

export default mongoose.model("Appointment", AppointmentSchema);