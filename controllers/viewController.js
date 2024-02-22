const Bet = require("../models/betsModel");
const User = require("../models/usersModel");

exports.getOverview = async (req, res) => {
    try {
        const bets = await Bet.find();
        const users = await User.find();
        res.status(200).render("base", {
        title: "Bob Tracker",
        bets,
        users,
        });
    } catch (err) {
        res.status(404).json({
        status: "fail",
        message: err,
        });
    }
};