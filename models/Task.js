const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    userId: { type: String, required: true, immutable: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    due: {type: Date}
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
