// When a new bet is created, user data should be updated. (lastBet, totalBets, totalWins, totalWagered, etc)

// Path: utils/updateUser.js

const User = require('../models/usersModel');

const updateStats = async (bet) => {
    try {
        const user = await User.findOne();
        user.lastBet = bet.timestamp;
        user.totalBets += 1;
        user.totalWagered += bet.bet;
        //user.progressToNextLevel = bet.user.progress;
        if (bet.win > bet.bet) {
            user.totalWins += 1;
        }
        if (bet.lucky) {
            user.luckyWins += 1;
        }
        await user.save();
    }
    catch (err) {
        console.log(err);
}}

module.exports = updateStats;