// Function to insert a new bet into the database

const Bet = require("../models/betsModel");

const createBet = async (bet) => {
    try {
        // check if the bet is repeated
        const repeatedBet = await Bet.findOne({ id: bet.id });
        if (repeatedBet) {
            return null
        }
        const newBet = await Bet.create({
            title: bet.title,
            timestamp: bet.timestamp,
            bet: bet.bet,
            win: bet.win,
            lucky: bet.lucky,
            large: bet.large,
            id: bet.id,
        });
        return newBet;
    } catch (error) {
        console.log(error);
    }

};

module.exports = createBet;