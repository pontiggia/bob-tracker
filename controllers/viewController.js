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
    const slot = req.params.slot.replace("-", " ");
    const bets = await Bet.find({ title: slot });
    // Calcular las estadísticas utilizando agregación de MongoDB
    const stats = await Bet.aggregate([
      { $match: { title: slot } },
      {
        $group: {
          _id: null,
          totalBets: { $sum: 1 },
          totalWagered: { $sum: "$bet" },
          totalWins: { $sum: { $cond: [{ $gt: ["$win", "$bet"] }, 1, 0] } },
          totalEarn: { $sum: "$win" },
          luckyWins: { $sum: { $cond: ["$lucky", 1, 0] } },
        },
      },
    ]);

    // Renderizar la vista con las estadísticas
    res.status(200).render("slot_info", {
      bets: [], // No se necesitan todas las apuestas aquí, solo las estadísticas
      game: slot,
      ...stats[0], 
      bets
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Internal server error." });
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
  } catch (error) {}
};
