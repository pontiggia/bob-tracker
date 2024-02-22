const mongoose = require('mongoose');

const betsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    bet: {
        type: Number,
        required: true
    },
    win: {
        type: Number,
        required: true
    },
    lucky: {
        type: Boolean,
        default: false
    },
    large: {
        type: Boolean,
        default: false
    },
    id: {
        type: String,
        required: true
    },
});

const Bets = mongoose.model('Bets', betsSchema);

module.exports = Bets;