const mongoose = require('mongoose');
const validator = require('validator');

const noteSchema = new mongoose.Schema({
    author: {
        type: String,
        trim: true,
        required: [true, "Please add a author"],
    },
    type: {
        type: String,
        required: [true, "Please add a type"],
    },
    content: {
        type: String,
        required: [true, "Please add a context"],
    },
    created_at: {
        type: Date,
        default: Date.now(),
        required: [true, "Please add created_at"],
    },
    updated_at: {
        type: Date,
        default: Date.now(),
        required: [true, "Please add updated_at"],
    }
});

module.exports = mongoose.model("note", noteSchema);