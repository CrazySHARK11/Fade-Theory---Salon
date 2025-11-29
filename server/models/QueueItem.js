import mongoose from "mongoose";

const QueueItemSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', reqquired: true },
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    preferredDates: [Date], 
    note: String,
    status: { type: String, enum: ['PENDING','ASSIGNED','REJECTED'], default: 'PENDING' },
    createdAt: { type: Date, default: Date.now }
})

export default mongoose.model("QueueItem", QueueItemSchema);