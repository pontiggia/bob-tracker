const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'A user must have a username'],
        unique: true
    },
    level: {
        type: Number,
        required: true
    },
    totalWagered: {
        type: Number  
    },
    progressToNextLevel: {
        type: Number,
        required: true
    },
    lastBet: {
        type: Date
    },
    luckyWins: {
        type: Number
    },
    totalWins: {
        type: Number
    },
    totalBets: {
        type: Number
    }
});

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;