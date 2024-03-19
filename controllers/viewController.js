const Bet = require("../models/betsModel");
const User = require("../models/usersModel");
const Slots = require("../models/slotsModel");

exports.getOverview = async (req, res) => {
  try {
    const bets = await Bet.find();
    const users = await User.find();
    res.status(200).render("index", {
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

// Get slots stats

exports.getSlotStats = async (req, res) => {
  try {
    let slot = req.params.slot;
    slot = slot.replace('-', " ")
    const bets = await Bet.find({ title: slot });
    let totalBets = bets.length;
    let totalWagered = 0;
    let totalWins = 0;
    let totalEarn = 0;
    let luckyWins = 0;

    bets.forEach((bet) => {
      totalWagered += bet.bet;
      totalEarn += bet.win;
      if (bet.win > bet.bet) {
        totalWins += 1;
      }
      if (bet.lucky) {
        luckyWins += 1;
      }
    });
    res.status(200).render("slot_info", {
        game: slot,
        totalBets,
        totalWagered,
        totalWins,
        totalEarn,
        luckyWins
      });

  } catch (error) {
    res.status(404).json({
        status: "fail",
        message: error,
      });
  }
};


exports.getSlotsTitle = async (req, res) => {
  try {
    // get slots from the database
    const slots = await Slots.find();

    res.status(200).render("slots", {
      title: "Slots",
      slots,
    });

  } catch (error) {
    
  }


};