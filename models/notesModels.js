import mongoose from 'mongoose';

const notesSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        rquired: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }

}, { timestamps: true })

export default mongoose.model("Notes", notesSchema);
