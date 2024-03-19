const mongoose = require('mongoose');

const slotsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A slot must have a title'],
        unique: true
    },
    totalWagered: {
        type: Number,
        default: 0
    },
    TotalEarn: {
        type: Number,
        default: 0
    },
    totalBets: {
        type: Number,
        default: 0
    },
    totalWins: {
        type: Number,
        default: 0
    },
    luckyWins: {
        type: Number,
        default: 0
    }
});

const Slots = mongoose.model('Slots', slotsSchema);

module.exports = Slots;